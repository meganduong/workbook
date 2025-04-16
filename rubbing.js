//sourced from p5js website, example mouseMoved()
let value = 0;

function setup() {
  createCanvas(windowWidth,windowHeight);
  let link = createA("week-4.html", "Week 4");
  link.position(width / 2 - 50, height / 2); // position it on screen
  link.style("font-size", "5em");
  link.style("color", "white");
  link.style("text-decoration", "none");
}

function draw() {
  background(255);
  // this adjustment of colour mapping from 0 to rbg(247,188,209) i attribute got chat gpt to help me 
  let r = 255;
  let g = map(value, 0, 255, 255, 188);
  let b = map(value, 0, 255, 255, 209);
 
  noStroke();
  fill(r, g, b);
  rect(25, 25, width , height );
}

function mouseMoved() {
   if (value < 247) {
    value += 0.4;
  }

  //// Reset the grayscale value.
  //if (value > 255) {
  //  value = 0;
  //}
  // Uncomment to prevent any default behavior.
   //return false;
}
