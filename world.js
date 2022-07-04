"use strict";

/* global XXH */
/* exported --
    p3_preload
    p3_setup
    p3_worldKeyChanged
    p3_tileWidth
    p3_tileHeight
    p3_tileClicked
    p3_drawBefore
    p3_drawTile
    p3_drawSelectedTile
    p3_drawAfter
*/

const tileSize = 16;
const noiseScale = 0.1;
const speed = 5;
const buffer = 10;
const images = [];

var x = 0;
var y = 0;
var w = 0;
var h = 0;
var xRO = 0; 
var yRO = 0;
var xTO = 0;
var yTO = 0;
var index = 0;

const tiles = [];

function preload() {
  images.push(loadImage('water.png'));
  images.push(loadImage('sand.png'));
  images.push(loadImage('grass.png'));
  images.push(loadImage('forest.png'));
}

function p3_setup() {
  createCanvas(1080, 720);
  w = width / tileSize + buffer;
  h = height / tileSize + buffer;
}

let worldSeed;

function p3_worldKeyChanged(key) {
  worldSeed = XXH.h32(key, 0);
  noiseSeed(worldSeed);
  randomSeed(worldSeed);
}

function p3_tileWidth() {
  return 16;
}
function p3_tileHeight() {
  return 16;
}

let [tw, th] = [p3_tileWidth(), p3_tileHeight()];

let clicks = {};

function p3_tileClicked(i, j) {
  let key = [i, j];
  clicks[key] = 1 + (clicks[key] | 0);
  console.log(i, j);
  console.log(images.length);
}

function p3_drawBefore() {}

function getTile(x, y) {
  let v = noise((xTO + x) * noiseScale, (yTO + y) * noiseScale);
  let scales = [0.4, 0.5, 0.7, 1];
  for (let i = 0; i < scales.length; i++) {
    let terrainScale = scales[i];
    if (v <= terrainScale) {
      if(i != 3){
        index = i+1;
      }
      else{
        index = i-1;
      }
      return images[i];
    }
  }
}
function p3_drawTile(i, j) {
  let img = getTile(i, j)
  noStroke();
  fill(noise(i, j) * 255);
  
  push();
  beginShape();
  vertex(0, 0);
  vertex(0, tw);
  vertex(th, tw);
  vertex(th, 0);
  endShape(CLOSE);
  image(img, 0 , 0 , 0)
  let n = clicks[[i, j]] | 0;
  if (n % 2 == 1) {
    image(images[index], 0, 0, 0);
  }
  pop();
}

function p3_drawSelectedTile(i, j) {
  noFill();
  stroke(0, 255, 0, 128);

  beginShape();
  vertex(0, 0);
  vertex(0, tw);
  vertex(th, tw);
  vertex(th, 0);
  endShape(CLOSE);

  noStroke();
  fill(0);
  text("(" + [i, j] + ")", 0, 0);
}

function p3_drawAfter() {}
