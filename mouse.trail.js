let messages = [];

function setup() {
  frameRate(10);
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('position', 'fixed');
  canvas.style('top', '0');
  canvas.style('left', '0');
  canvas.style('z-index', '9999'); 
  canvas.style('pointer-events', 'none'); 

  textSize(14);
  textAlign(CENTER, CENTER);
  noStroke();
}

function draw() {
  clear(); 

  if (mouseX >= 0 && mouseY >= 0 && mouseX <= width && mouseY <= height) {
    messages.push({ x: mouseX, y: mouseY, alpha: 64 });
  }

  for (let i = messages.length - 1; i >= 0; i--) {
    let m = messages[i];
    if (!m) continue;

    fill(0, m.alpha);
    text('e⁻', m.x, m.y);
    m.alpha -= 1;

    if (m.alpha <= 0) {
      messages.splice(i, 1);
    }
  }
}

