//chat gpt assisted
let messages = [];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  canvas.style('position', 'fixed');
  canvas.style('pointer-events', 'none');

  textSize(14);
  textAlign(CENTER, CENTER);
  noStroke();
}

function draw() {
  background(255, 20);

  if (mouseX >= 0 && mouseY >= 0 && mouseX <= width && mouseY <= height) {
    messages.push({ x: mouseX, y: mouseY, alpha: 64 });
  }

  for (let i = messages.length - 1; i >= 0; i--) {
    let m = messages[i];
    if (!m) continue; // Skip if null

    fill(0, m.alpha);
    text('#intmediarulez', m.x, m.y);
    m.alpha -= 1;

    if (m.alpha <= 0) {
      messages.splice(i, 1);
    }
  }
}
