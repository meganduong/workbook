let osc, reverb;
let video;
let handposeModel;
let predictions = [];

let rightTrail = [];
let leftTrail = [];

function setup() {
  createCanvas(600, 400);
  noCursor();

  // Sound
  osc = new p5.Oscillator('triangle');
  reverb = new p5.Reverb();
  osc.disconnect();
  reverb.process(osc, 3, 5);

  // Video
 video = createCapture(VIDEO);
video.size(width, height);
video.hide();

  // Load handpose model
  handposeModel = ml5.handPose(video, { flipHorizontal: true }, () => {
    console.log("🤖 Handpose model loaded");
  });

  // Start detection loop
  handposeModel.on('predict', results => {
    predictions = results;
  });
}

function draw() {
  image(video, 0, 0, width, height);
  drawTrails();

  if (predictions.length >= 2) {
    const hand1 = predictions[0];
    const hand2 = predictions[1];

    let left, right;
    if (hand1.annotations.indexFinger[3][0] < hand2.annotations.indexFinger[3][0]) {
      left = hand1;
      right = hand2;
    } else {
      left = hand2;
      right = hand1;
    }

    const rightTip = right.annotations.indexFinger[3];
    const leftTip = left.annotations.indexFinger[3];

    rightTrail.push({ x: rightTip[0], y: rightTip[1] });
    leftTrail.push({ x: leftTip[0], y: leftTip[1] });

    if (rightTrail.length > 50) rightTrail.shift();
    if (leftTrail.length > 50) leftTrail.shift();

    controlTheremin(rightTip[0], leftTip[1]);
  } else {
    osc.stop();
  }
}

function controlTheremin(x, y) {
  if (!osc.started) osc.start();
  let pitch = map(x, 0, width, 261.6, 493.88, true);
  let vol = map(y, 0, height, 0.8, 0, true);
  osc.freq(pitch);
  osc.amp(vol);
}

function drawTrails() {
  noStroke();

  fill(255, 100, 200, 120);
  for (let pt of rightTrail) ellipse(pt.x, pt.y, 10);

  fill(100, 255, 255, 120);
  for (let pt of leftTrail) ellipse(pt.x, pt.y, 10);
}

function mousePressed() {
  userStartAudio(); // fixes browser sound blocking
}
