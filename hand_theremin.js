// code attributed to “Theremin Simulator” by Hong Hua and ml5.org + chat gpt assisted adjustment
let handPose;
let video;
let hands = [];
let osc;
let started = false;

let rightTrail = [];
let leftTrail = [];

function preload() {
  handPose = ml5.handPose(); 
}

function setup() {
  createCanvas(550, 400);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  handPose.detectStart(video, gotHands); 

  osc = new p5.Oscillator('triangle');
  osc.amp(0);
  osc.start();
}

function draw() {
  background(0);
  image(video, 0, 0, width, height);

  if (hands.length >= 2) {
    // Sort left/right by x position
    let hand1 = hands[0];
    let hand2 = hands[1];
    let left, right;

    if (hand1.keypoints[8].x < hand2.keypoints[8].x) {
      left = hand1;
      right = hand2;
    } else {
      left = hand2;
      right = hand1;
    }

    const rightTip = right.keypoints[8];
    const leftTip = left.keypoints[8];

    // Update trails
    rightTrail.push({ x: rightTip.x, y: rightTip.y });
    leftTrail.push({ x: leftTip.x, y: leftTip.y });

    if (rightTrail.length > 40) rightTrail.shift();
    if (leftTrail.length > 40) leftTrail.shift();

    drawTrails();

    const pitch = map(rightTip.x, 0, width, 200, 800);
    const vol = map(leftTip.y, 0, height, 1, 0);

    if (started) {
      osc.freq(pitch);
      osc.amp(vol, 0.1);
    
      // Clear all .hovering classes
      ["one", "two", "three"].forEach(className => {
        const el = document.querySelector(`.${className}`);
        if (el) el.classList.remove("hovering");
      });
    
      // Define frequency ranges
      if (pitch >= 200 && pitch < 400) {
        document.querySelector(".one")?.classList.add("hovering");
      } else if (pitch >= 400 && pitch < 600) {
        document.querySelector(".two")?.classList.add("hovering");
      } else if (pitch >= 600 && pitch <= 800) {
        document.querySelector(".three")?.classList.add("hovering");
      }
    }
    

  
    fill(255, 100, 150);
    textSize(16);
    text(`pitch: ${Math.round(pitch)} Hz`, 10, 20);
    fill(100, 255, 255);
    text(`volume: ${vol.toFixed(2)}`, 10, 40);

    fill(255, 100, 150);
    circle(rightTip.x, rightTip.y, 15);
    fill(100, 255, 255);
    circle(leftTip.x, leftTip.y, 15);
  } else {
    osc.amp(0, 0.2); // fade to silence
    fill(255);
    textSize(16);
    text("Click and show both hands in frame to play ", 10, 20);
  }
}

function drawTrails() {
  noStroke();
  fill(255, 100, 150, 120);
  for (let pt of rightTrail) {
    circle(pt.x, pt.y, 10);
  }
  fill(100, 255, 255, 120);
  for (let pt of leftTrail) {
    circle(pt.x, pt.y, 10);
  }
}

function gotHands(results) {
  hands = results;
}

function mousePressed() {
  userStartAudio();
  started = true;
}
