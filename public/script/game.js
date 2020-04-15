


var filesToLoad = 12;
var loadCounter = 0;
var canvas_size = 800;
var agentRightImg;
var agentLeftImg;
var agentUpImg;
var agentDownImg;
var agentDeadImg;
var ground_Img;
var ground_pit_Img;
var ground_pit_ghost_img;
var ground_ghost_img;
var ghostImg;
var keyImg;
var pitImg;
var wumpusWorld;
var side_number = 8;

function loadAssets(callback){
  agentRightImg = loadImage('/img/agentRight.png',callback);
  agentLeftImg = loadImage('/img/agentLeft.png',callback);
  agentUpImg = loadImage('/img/agentUp.png',callback);
  agentDownImg = loadImage('/img/agentDown.png',callback);
  agentDeadImg = loadImage('/img/agentDead.png',callback);
  ground_Img = loadImage('/img/ground.jpg',callback);
  ground_pit_Img = loadImage('/img/pit_ground.jpg',callback);
  ground_pit_ghost_img = loadImage('/img/ghost_pit_ground.jpg',callback);
  ground_ghost_img = loadImage('/img/ghost_ground.jpg',callback);
  ghostImg = loadImage('/img/ghost.png',callback);
  keyImg = loadImage('/img/goldkey.png',callback);
  pitImg = loadImage('/img/pit.jpg',callback);
}

function setup() {
  var canvas = createCanvas(canvas_size, canvas_size);
  canvas.parent("wumpus");
  loadAssets(loadCallback);
  wumpusWorld = new Wumpus_world(side_number);
}

function loadCallback() {
  loadCounter++;
  if (loadCounter == filesToLoad) {
      loading = false;
  }
}

function keyPressed() {
  // console.log(keyCode);
  if (keyCode === UP_ARROW) {
  }
  else if (keyCode === DOWN_ARROW) {
  } 
  else if (keyCode === LEFT_ARROW) {
  } 
  else if (keyCode === RIGHT_ARROW) {
  } 
  else if (keyCode == ENTER) {
  } 
  else if (keyCode == 32) {
  }
}


function draw() {
  background(255);
  smooth();
  wumpusWorld.display();
}