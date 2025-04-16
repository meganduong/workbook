// code from Karen Anne's git hub repo 
let faceapi;
let detections = [];

let video;
let canvas;

let hasRedirected = false;



function setup() {
  let heading = createElement('h3', 'before you proceed, i need to see if you are truly a FRIEND or FOE');
heading.position(20, 10); // x=20px, y=10px from top-left
heading.style('font-family', 'monospace');
heading.style('color', 'white');
heading.style('z-index', '10');
heading.style('position', 'absolute');

  canvas = createCanvas(windowWidth, windowHeight);
  background(0);
  canvas.id("canvas");
  video = createCapture(VIDEO);// Creat the video
  video.id("video");
  video.size(width, height);

  const faceOptions = {
    withLandmarks: true,
    withExpressions: true,
    withDescriptors: true,
    minConfidence: 0.5
  };
  faceapi = ml5.faceApi(video, faceOptions, faceReady);
}

function faceReady() {
  faceapi.detect(gotFaces);// Start detecting faces
}

// Got faces
function gotFaces(error, result) {
  if (error) {
    console.log(error);
    return;
  }
  detections = result; //Now all the data --> detections
  clear();
  drawBoxs(detections); //Draw box
  drawLandmarks(detections); // Draw face points
  drawExpressions(detections, width/10, height/2, 20);
  faceapi.detect(gotFaces);
}

function drawBoxs(detections){
  if (detections.length > 0) { //If at least 1 face is detected
    for (f=0; f < detections.length; f++){
      let {_x, _y, _width, _height} = detections[f].alignedRect._box;
      stroke(0, 255, 0);
      strokeWeight(1);
      noFill();
      rect(_x, _y, _width, _height);
    }
  }
}

function drawLandmarks(detections){
  if (detections.length > 0) { //If at least 1 face is detected: 
    for (f=0; f < detections.length; f++){
      let points = detections[f].landmarks.positions;
      for (let i = 0; i < points.length; i++) {
        stroke(0, 255, 0);
        strokeWeight(3);
        square(points[i]._x, points[i]._y,2);
      }
    }
  }
}

//this drawExpressions i had chat gpt alter to define new variables: friend, unsure, foe by combining the sentiments
function drawExpressions(detections, x, y, textYSpace){
  textFont('Ballet');
  textSize(200);
  noStroke();

  if (detections.length > 0) {
    let expr = detections[0].expressions;

    let friend = expr.happy;
    let unsure = expr.neutral + expr.surprised;
    let foe = expr.sad + expr.angry + expr.disgusted + expr.fearful;

    let maxVal = max(friend, unsure, foe);
    let label = 'Unsure...';
    let col = color(255);

    if (maxVal === friend) {
      label = 'Friend!';
      col = color(255);
    } else if (maxVal === foe) {
      label = 'Foe!';
      col = color(255);
    }

    fill(col);
    textAlign(CENTER, CENTER);
    text(label, width / 2, height / 1.5);

    // Redirect if FRIEND detected, attributed to chat gpt
    if (label === 'Friend!' && !hasRedirected) {
      hasRedirected = true;
      setTimeout(() => {
        window.location.href = 'week-5.html';
      }, 1000); 
    }

  } else {
    textSize(100);
    fill(255);
    textAlign(LEFT, TOP);
    text("No face detected", x, y);
  }
}
