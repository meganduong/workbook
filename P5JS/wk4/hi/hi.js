//this was done during the wk 4 live code demo
var pic;

function preload() {
  pic=loadImage("data/yasss.jpeg");
}
function setup() {
createCanvas(windowWidth,windowHeight);

}


function draw() {
image(pic,mouseX, mouseY, 500,250);
}
