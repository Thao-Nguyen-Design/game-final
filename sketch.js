"use strict";

let state = "title";
let cnv;
let player;
let hearts = [];

let playerImg;
let heartImg;
let notifImg;

let phonescreenImg;
let homescreenImg;
let instructionscreenImg;

let points = 0;
let familytime = 10;
let friendship = 10;
let popularity = 0;
let timer = 0;

let textfont;
let titlefont;

let popup1Img;
let popup2Img;
let popup3Img;
let popup4Img;
let popup5Img;

let yesanswer = false;
let noanswer = false;

function preload() {
  textfont = loadFont("assests/retro.ttf");
  titlefont = loadFont("assests/Mario-Kart-DS.ttf");

  playerImg = loadImage("assests/player.png");
  heartImg = loadImage("assests/heart.gif");
  notifImg = loadImage("assests/notif.png");

  phonescreenImg = loadImage("assests/phonescreen.png");
  homescreenImg = loadImage("assests/homescreen.gif");
  instructionscreenImg = loadImage("assests/instructionscreen.gif");

  popup1Img = loadImage("assests/popup1.png");
  popup2Img = loadImage("assests/popup2.png");
  popup3Img = loadImage("assests/popup3.png");
  popup4Img = loadImage("assests/popup4.png");
  popup5Img = loadImage("assests/popup5.png");

}

function setup() {
  canvas = createCanvas(1000, 600);
  canvas.parent("sketch-holder");
  // background(230);
  imageMode(CENTER);
  rectMode(CENTER);
  angleMode(DEGREES);

  player = new Player();

}

function draw() {

  switch (state) {
    case "title":
      title();
      canvas.mouseClicked(titleMouseClicked);
      break;

    case "instruction":
      instruction();
      canvas.mouseClicked(instructionMouseClicked);
      break;

    case "level 1":
      level1();
      break;

    case "question 1":
      question1();
      canvas.mouseClicked(question1MouseClicked);
      break;

    case "level 2":
      level2();
      break;

    case "question 2":
      question2();
      canvas.mouseClicked(question2MouseClicked);
      break;

    case "level 3":
      level3();
      break;

    case "question 3":
      question3();
      canvas.mouseClicked(question3MouseClicked);
      break;

    case "level 4":
      level4();
      break;

    case "question 4":
      question4();
      canvas.mouseClicked(question4MouseClicked);
      break;

    case "level 5":
      level5();
      break;

    case "question 5":
      question5();
      canvas.mouseClicked(question5MouseClicked);
      break;

    case "end screen":
      endscreen();
      canvas.mouseClicked(endscreenMouseClicked);
      break;
  }

  // check if click yes or no
  if (mouseX > width * 0.62 && mouseX < width * 0.7 &&
    mouseY > height * 0.77 && mouseY < height * 0.85) {
    yesanswer = true;
  }
  else if (mouseX > width * 0.77 && mouseX < width * 0.85 &&
    mouseY > height * 0.77 && mouseY < height * 0.85) {
    noanswer = true;
  }

}

function keyPressed() {
  if (keyCode == LEFT_ARROW) {
    player.direction = "left";
  } else if (keyCode == RIGHT_ARROW) {
    player.direction = "right";
  } else if (keyCode == UP_ARROW) {
    player.direction = "up";
  } else if (keyCode == DOWN_ARROW) {
    player.direction = "down";
  } else if (key = " ") {}
  // else if (key == "Y" || key == "y"){
  //   loop();
  //   console.log("y");
  // }
}

function keyReleased() {
  let numberKeysPressed = 0;
  if (keyIsDown(LEFT_ARROW)) {
    numberKeysPressed++;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    numberKeysPressed++;
  }
  if (keyIsDown(UP_ARROW)) {
    numberKeysPressed++;
  }
  if (keyIsDown(DOWN_ARROW)) {
    numberKeysPressed++;
  }
  if (numberKeysPressed == 0) {
    player.direction = "still";
  }

}

function title() {
  state = "title";
  textAlign(CENTER);
  push();
  translate(width / 2, height / 2);
  image(homescreenImg, 0, 0, 1000, 600);
  pop();
}

function titleMouseClicked() {
  state = "instruction";
}

function instruction() {
  push();
  translate(width / 2, height / 2);
  image(instructionscreenImg, 0, 0, 1000, 600);
  pop();
}

function instructionMouseClicked() {
  state = "level 1";

}

// template for the level
function baseLevel() {
  textAlign(LEFT);
  textFont(textfont);
  background(255);

  //background
  push();
  translate(width / 2, height / 2);
  image(phonescreenImg, 0, 0, 1000, 600);
  pop();

  //notif
  image(notifImg, width * 0.13, height * 0.15, width * 0.135, height * 0.165);
  fill(255);
  push();
  textSize(33);
  text(points, width * 0.14, height * 0.16);
  pop();

  //scores text
  push();
  textSize(30);
  fill(0);
  text("followers: " + popularity, width * 0.22, height * 0.13);
  text("online time: " + timer + " mins", width * 0.22, height * 0.2);

  text("family time: " + familytime, width * 0.65, height * 0.2);
  text("friendship: " + friendship, width * 0.65, height * 0.13);
  pop();

  // call classes
  if (random(1) <= 0.01) {
    hearts.push(new Heart(50, 40));

  }
  player.display();
  player.move();

  for (let i = 0; i < hearts.length; i++) {
    hearts[i].display();
    hearts[i].move();

  }

  //check for collision, increase points if there is collision
  //splice out of the array
  //interate backwards
  for (let i = hearts.length - 1; i >= 0; i--) {

    if (dist(player.x, player.y, hearts[i].x, hearts[i].y) <=
      (player.w + hearts[i].w) / 2) {
      points++;
      popularity++;
      friendship--;
      familytime--;
      hearts.splice(i, 1);
    } else if (hearts[i].y > height * 0.87) {
      hearts.splice(i, 1);
    }
  }

  if (frameCount % 60 == 0) {
    timer++;
  }


}

//everything level 1
function level1() {
  state = "level 1";
  baseLevel();

  if (timer >= 30) {
    question1();
  }

}

function question1() {
  state = "question 1";
  image(popup1Img, width / 2, height / 2);
//   push();
//   rectMode(CORNER);
//   rect(0,0 , width *0.1);
//   rect(width * 0.62, height *0.77, 20);
//   rect(width * 0.7, height *0.77, 20);
//
// rect(width * 0.77, height *0.77, 20);
// rect(width * 0.85, height *0.77, 20);
//   pop();
}

function question1MouseClicked() {

  //if click yes
  if (yesanswer == true) {
    points = points;
    friendship += int(random(5, 20));
    popularity -= int(random(5, 20));
    familytime = familytime;
    state = "level 2";
  }
  //if choose no
  else if (noanswer == true) {
    points = points;
    friendship -= int(random(5, 20));
    popularity = popularity;
    familytime = familytime;
    state = "level 2";
  }

  //do not let followers drop below 0
  if (popularity <= 0) {
    popularity = 0;
  }

}

//everything level 2
function level2() {
  state = "level 2";
  baseLevel();

  if (timer >= 60) {
    question2();
  }

}

function question2() {
  state = "question 2";
  image(popup2Img, width / 2, height / 2);
}

function question2MouseClicked() {

  //if click yes
  if (yesanswer == true) {
    points = points;
    friendship = friendship;
    popularity -= int(random(5, 20));
    familytime += int(random(5, 20));
    state = "level 3";

  }
  //if choose no
  else if (noanswer == true) {
    points = points;
    friendship = friendship;
    popularity = popularity;
    familytime -= int(random(5, 20));
    state = "level 3";

  }

  //do not let followers drop below 0
  if (popularity <= 0) {
    popularity = 0;
  }
}

//everything level 3
function level3() {
  state = "level 3";
  baseLevel();

  if (timer >= 90) {
    question3();
  }

}

function question3() {
  state = "question 3";
  image(popup3Img, width / 2, height / 2);
}

function question3MouseClicked() {

  //if click yes
  if (yesanswer == true) {
    points = points;
    friendship += int(random(5, 20));
    popularity -= int(random(5, 20));
    familytime = familytime;
    state = "level 4";

  }
  //if choose no
  else if (noanswer == true) {
    points = points;
    friendship -= int(random(5, 20));
    popularity = popularity;
    familytime = familytime;
    state = "level 4";

  }

  //do not let followers drop below 0
  if (popularity <= 0) {
    popularity = 0;
  }
}

//everything level 4
function level4() {
  state = "level 4";
  baseLevel();

  if (timer >= 120) {
    question4();
  }

}

function question4() {
  state = "question 4";
  image(popup4Img, width / 2, height / 2);
}

function question4MouseClicked() {

  //if click yes
  if (yesanswer == true) {
    points = points;
    friendship = friendship;
    popularity = popularity;
    familytime = familytime;
    state = "level 5";

  }
  //if choose no
  else if (noanswer == true) {
    points = points;
    friendship = friendship;
    popularity += int(random(5, 20));
    familytime = familytime;
    state = "level 5";

  }

  //do not let followers drop below 0
  if (popularity <= 0) {
    popularity = 0;
  }

}

//everything level 5
function level5() {
  state = "level 5";
  baseLevel();

  if (timer >= 145) {
    question5();
  }

}

function question5() {
  state = "question 5";
  image(popup5Img, width / 2, height / 2);
}

function question5MouseClicked() {

  //if click yes
  if (yesanswer == true) {
    points = points;
    friendship = friendship;
    popularity -= int(random(5, 20));
    familytime += int(random(5, 20));
    state = "end screen";

  }
  //if choose no
  else if (noanswer == true) {
    points = points;
    friendship = friendship;
    popularity += int(random(5, 20));
    familytime -= int(random(5, 20));
    state = "end screen";

  }

  //do not let followers drop below 0
  if (popularity <= 0) {
    popularity = 0;
  }

}

function endscreen() {
  state = "end screen";
  background(255);
  image(phonescreenImg, width / 2, height / 2);
  push();
  //   rectMode(CORNER);
  // rect(width *0.2, height *0.8, width *0.25, height *0.1);
  // rect(width *0.6, height *0.8, width *0.2, height *0.1);
  // pop();

  //drop shadow effect
  push();
  fill(255);
  textSize(20);
  stroke(255);
  strokeWeight(4);
  text("You have spend more time on social media today \nthan an average person!",
    width * 0.202, height * 0.522);
  text("You have gained:", width * 0.202, height * 0.622)

  text("Likes: " + points, width * 0.202, height * 0.672);
  text("Followers: " + popularity, width * 0.202, height * 0.722);

  text("Friendship: " + friendship, width * 0.602, height * 0.672);
  text("Family time: " + familytime, width * 0.602, height * 0.722);

  text("Are you happy with your choices?", width * 0.202, height * 0.802);
  push();
  fill(255);
  stroke(255);
  strokeWeight(3);
  text("> Yes: Back to title", width * 0.202, height * 0.852);
  pop();

  push();
  fill(255);
  stroke(255);
  strokeWeight(4);
  text("> No: Play again", width * 0.602, height * 0.852);
  pop();

  pop();



  push();
  fill(0);
  textSize(20);
  text("You have spend more time on social media today \nthan an average person!",
    width * 0.2, height * 0.52);
  text("You have gained:", width * 0.2, height * 0.62)

  text("Likes: " + points, width * 0.2, height * 0.67);
  text("Followers: " + popularity, width * 0.2, height * 0.72);

  text("Friendship: " + friendship, width * 0.6, height * 0.67);
  text("Family time: " + familytime, width * 0.6, height * 0.72);

  text("Are you happy with your choices?", width * 0.2, height * 0.8);
  push();
  fill(108, 190, 86);
  text("> Yes: Back to title", width * 0.2, height * 0.85);
  pop();

  push();
  fill(255, 85, 85);
  text("> No: Play again", width * 0.6, height * 0.85);
  pop();

  pop();

}

function endscreenMouseClicked() {

  //if choose yes
  if (mouseX > width * 0.2 && mouseX < width * 0.45 &&
    mouseY > height * 0.8 && mouseY < height * 0.9) {
    points = 0;
    familytime = 10;
    friendship = 10;
    popularity = 0;
    timer = 0;
    state = "title";
  }

  //if choose no
  else if (mouseX > width * 0.6 && mouseX < width * 0.8 &&
    mouseY > height * 0.8 && mouseY < height * 0.9) {
    points = 0;
    familytime = 10;
    friendship = 10;
    popularity = 0;
    timer = 0;
    state = "level 1";

  }

}
