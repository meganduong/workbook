// 'Aim' interaction attributed to p5js.org
// 'Reach' interaction attributed to p5js.org based on code from Keith Peters
// 'Tickle' interaction attributed to pjs.org
// I combined these three scripts with the assitance of chat gpt and adjusted when necessary



let segLength = 180;
let x, y, x2, y2;

let font, fontsize = 80;
let links = [
  { message: 'Week 4', href: 'rubbing.html', x: 0, y: 0, bounds: null },
  { message: 'Week 5', href: 'face-track.html', x: 0, y: 0, bounds: null },
  { message: 'Week 6', href: 'piano.html', x: 0, y: 0, bounds: null }
];

function preload() {
  font = loadFont('fonts/Ballet.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  angleMode(DEGREES);

  strokeWeight(2);
  stroke(0, 0);
  x = width / 2;
  y = height / 2;
  x2 = x;
  y2 = y;

  textFont(font);
  textSize(fontsize);
  textAlign(LEFT, TOP);

 
  let totalWidth = 0;
  for (let link of links) {
    let b = font.textBounds(link.message, 0, 0, fontsize);
    totalWidth += b.w + 40;
    link.bounds = b;
  }

  let startX = width / 2 - totalWidth / 2;
  for (let i = 0; i < links.length; i++) {
    let b = links[i].bounds;
    links[i].x = startX;
    links[i].y = height - 400;
    links[i].bounds = font.textBounds(links[i].message, startX, height - 200, fontsize);
    startX += b.w + 40;
  }
}

function draw() {
  background(255);
  drawTicklishLinks();

  stroke(0, 100);
  strokeWeight(2);
  drawEyes();
  drawSegmentArm();
}

function drawEyes() {
  let eyeSize = 50;
  let pupilSize = 25;
  let offset = 12.5;
  let eyeY = 100;

  let positions = [width / 9.9, width / 2, width / 1.1];

  for (let i = 0; i < positions.length; i++) {
    let eyeX = positions[i];
    let angle = atan2(mouseY - eyeY, mouseX - eyeX);

    push();
    translate(eyeX, eyeY);
    stroke(0);
    strokeWeight(1);
    fill(255);
    ellipse(0, 0, eyeSize, eyeSize);
    rotate(angle);
    fill(0);
    ellipse(offset, 0, pupilSize, pupilSize);
    pop();
  }
}

function drawSegmentArm() {
  dragSegment(0, mouseX, mouseY);
}

function dragSegment(i, xin, yin) {
  let dx = mouseX - x;
  let dy = mouseY - y;
  let angle1 = atan2(dy, dx);

  let tx = mouseX - cos(angle1) * segLength;
  let ty = mouseY - sin(angle1) * segLength;
  dx = tx - x2;
  dy = ty - y2;
  let angle2 = atan2(dy, dx);
  x = x2 + cos(angle2) * segLength;
  y = y2 + sin(angle2) * segLength;

  segment(x, y, angle1);
  segment(x2, y2, angle2);
}

function segment(x, y, a) {
  push();
  translate(x, y);
  rotate(a);
  line(0, 0, segLength, 0);
  pop();
}

function drawTicklishLinks() {
  noStroke();
  fill(0);
  textSize(fontsize);

  for (let link of links) {
    text(link.message, link.x, link.y);
    link.bounds = font.textBounds(link.message, link.x, link.y, fontsize);

    if (
      mouseX >= link.bounds.x &&
      mouseX <= link.bounds.x + link.bounds.w &&
      mouseY >= link.bounds.y &&
      mouseY <= link.bounds.y + link.bounds.h
    ) {
      link.x += random(-2, 2);
      link.y += random(-2, 2);
      cursor(HAND);
    }
  }
}

function mousePressed() {
  for (let link of links) {
    if (
      mouseX >= link.bounds.x &&
      mouseX <= link.bounds.x + link.bounds.w &&
      mouseY >= link.bounds.y &&
      mouseY <= link.bounds.y + link.bounds.h
    ) {
      window.location.href = link.href;
    }
  }
}
