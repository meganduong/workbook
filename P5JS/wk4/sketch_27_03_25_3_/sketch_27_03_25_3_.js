var pic;

function preload() {
  pic=loadImage("data/yasss.jpeg");
}
function setup() {
createCanvas(windowWidth,windowHeight);
background ("black");

}


function draw() {
image(pic,mouseX, mouseY, auto);
}
