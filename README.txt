James Nguyen
CMPM 147
P3
07/03/2022

README

What is the effect you're trying to achieve? Did you achieve that effect? If not, what was the difficulty/limitation with tools, and what did you end up doing? 

The effect I'm trying to achieve is creating generating a map with water, sand, grass, and forest tiles. I was able to achieve this effect by dynamically creating the map via the seed and using
a tile algorithm in order to pair types of tiles to each other to make an effective map rather than a random assortment of different tiles. The biggest difficulty however, was actually a library implementation
with the network. Because of how the library is integrated (via a link) uploading an image in my case was not possible on a local upload. Thus in order to be able to load an image I used the p5.js web editor which let me 
upload images directly onto their servers to use. 

By clicking a tile you will revert the tile to lower configuration i.e thick grass will revert to light grass, light grass to sand, etc. 