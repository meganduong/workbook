let pic, dotcolour;
function preload() {
  pic=loadImage("data/IMG_1918-2.jpeg");
}
  

function setup() {

createCanvas (windowWidth,windowHeight);
 pic.resize(width,height);
}


function draw() {
//image(pic,0,0, width,height);
let x= random(width);
let y=random(height);
noStroke();
dotcolour=pic.get(x,y);
fill(dotcolour);
circle(x,y,random(6,60));
}
