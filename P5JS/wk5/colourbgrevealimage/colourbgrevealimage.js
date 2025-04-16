let bootomimg, topImg;
function preload() {
 bottomImg = loadImage('./data/IMG_1918.jpeg')
 topImg = loadImage('./data/IMG_1918_2.jpeg')
  
}
function setup() {
 createCanvas (windowWidth, windowHeight);
 background (200,200,0);
 bottomImg.resize (width,height);
 topImg.resize (width,height);
 
}


function draw() {

}
function mouseDragged() {
copy(topImg, mouseX, mouseY, 80,80, mouseX,mouseY,80,80);
}
