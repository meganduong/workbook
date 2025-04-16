let capture;
function setup() {
createCanvas (windowWidth,windowHeight);
capture = createCapture(VIDEO);
capture.hide();
}


function draw() {
//background('pink');
image(capture, mouseX,mouseY,100,200);
filter(GRAY,2);
filter(BLUR,1);

}
