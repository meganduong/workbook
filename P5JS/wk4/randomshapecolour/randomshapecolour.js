//this was done during the wk 4 live code demo
function setup() {
  createCanvas (windowWidth, windowHeight);
background (255);
noStroke();
}


function draw() {
  for (let i=0; i<10; i++) {
    fill(random(255), random(255),random(255));
    circle(random(width), random(height), random(60,200));
    triangle(random(width), random(height),random(width), random(height),random(width), random(height), random(60,200));
  }
  noLoop();
}
