let font, points, bounds; 
//let points; 

function preload() {
 font=loadFont("data/Deutschlands-copy.ttf");
}
function setup() {
createCanvas(windowWidth, windowHeight);
background ("white");
sampleF=0.2;
points=font.textToPoints("well,yes", width/4-200, height/2, 200, {
  sampleFactor:sampleF, 
  simplifyThreshold: 0
});
  rectMode(CENTER);
  //bounds = font.textBounds("diamonds",width/4-200, height/2, 400);
}


function draw() {
  background("pink")
  sampleF=map(mouseX,0,width,0,1);
  points=font.textToPoints("well,yes", width/4-200, height/2, 200, {
  sampleFactor:sampleF, 
  simplifyThreshold: 0
});
fill(255,0,0);
for (let i=0; i<points.length; i++) {
  fill (random(256), random (265), random(265));
  circle(points[i].x+random(5), points[i].y+random(5), 10);
  stroke("white");
  line(points[i].x, points[i].y, mouseY, mouseX);
}
}
