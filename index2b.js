let mic, analyzer,button;


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255,0);


  getAudioContext().resume();


  mic = new p5.AudioIn();
  mic.start();

  analyzer = new p5.Amplitude();

  
  button = createButton('enter');
  button.position(width / 2 , height / 2);

  button.mousePressed(() => {
    window.location.href = "content-page.html"; 
  });
 
}

function draw() {
  background(255,0);

  let volume = mic.getLevel();
  let scale = map(volume, 0, 0.2, 1, 20); 

  button.style('transform', `scale(${scale})`);
  button.position(width / 2 - 50 * scale, height / 2 - 25 * scale); 

  fill(0,50);           
  textSize(24 * scale);           
text("shhhhhhh", mouseX, mouseY);
}
