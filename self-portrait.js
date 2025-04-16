function setup() {
  createCanvas (windowWidth, windowHeight);
  background(173, 211, 230);


  
   // Head
    fill(255);  
    circle(width / 2, height / 2, 500);
    
    //Mouth
     fill(0); 
     textSize(100);
     text('3', 650, 550); 
     
    // Eyes
    fill('black');  
    circle(600, height / 2, 100);
    circle(800, height / 2, 100);
    
    // Eye highlights
    fill('white');
    circle(610, 360, 40);
    circle(820, 360, 40);
    
    //blush
    fill ('pink');
    ellipse(550,450, 100, 25);
    ellipse(800,450, 100, 25);
  
    // Glasses
    noFill();
    strokeWeight(5);  
    rect(500, 340, 180, 80);
    rect(700, 340, 180, 80);
    
     
  }
  
  
  function draw() {
    
    fill (0);
      if (mouseIsPressed) {
      circle(mouseX, mouseY, 70);
    }
  
  }
  
  