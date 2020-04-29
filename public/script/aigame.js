var loading = true;
var filesToLoad = 19;
var loadCounter = 0;
var canvas_size = 560;
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
var ghostDeadImg;
var keyImg;
var pitImg;
let victory_sound;
let lose_sound;
let bell_sound;
let wind_sound;
let ghost_sound;
let shoot_sound;
var wumpus_AI_World;
var side_number = 5;
var intervalId;

function loadAssets(callback){
  agentRightImg = loadImage('/img/agentRight.png',callback);
  agentLeftImg = loadImage('/img/agentLeft.png',callback);
  agentUpImg = loadImage('/img/agentUp.png',callback);
  agentDownImg = loadImage('/img/agentDown.png',callback);
  agentDeadImg = loadImage('/img/agentDead.png',callback);
  ground_Img = loadImage('/img/ground.png',callback);
  ground_pit_Img = loadImage('/img/pit_ground.jpg',callback);
  ground_pit_ghost_img = loadImage('/img/ghost_pit_ground.jpg',callback);
  ground_ghost_img = loadImage('/img/ghost_ground.jpg',callback);
  ghostImg = loadImage('/img/ghost.png',callback);
  ghostDeadImg = loadImage('/img/ghostDead.png',callback);
  keyImg = loadImage('/img/goldkey.png',callback);
  pitImg = loadImage('/img/pit.jpg',callback);
  bell_sound = loadSound('/sounds/bell.wav', callback);
  victory_sound = loadSound('/sounds/victory.wav', callback);
  lose_sound = loadSound('/sounds/lose.wav', callback);
  wind_sound = loadSound('/sounds/wind.wav', callback);
  ghost_sound = loadSound('/sounds/ghost.wav', callback);
  shoot_sound = loadSound('/sounds/shoot.wav', callback);
}

function setup() {
  var canvas = createCanvas(canvas_size, canvas_size);
  canvas.parent("wumpus");
  loadAssets(loadCallback);
  wumpus_AI_World = new AI_world(side_number);
}

function start(){
  intervalId = setInterval(function() {wumpus_AI_World.makeDecision()},300);   
}

function restart(){
  console.log("restart");
  wumpus_AI_World = new AI_world(side_number);
  let gameOver = document.getElementById("gameover");
  gameOver.innerHTML = "";
  clearInterval(intervalId);
}

function loadCallback() {
  loadCounter++;
  if (loadCounter == filesToLoad) {
      loading = false;
  }
}

function draw() {
  background(255);
  smooth();
  let gameOver = document.getElementById("gameover");
  let score = document.getElementById("score");
  if(!loading){
    wumpus_AI_World.display();
    score.innerHTML = "Score: " + wumpus_AI_World.wumpusworld.score;
    gameOver.innerHTML = "";
    if(wumpus_AI_World.wumpusworld.gameover){
      if(wumpus_AI_World.wumpusworld.hero.status){
          gameOver.innerHTML = "Climb out of the Cave!\n";
      }
      else{
        gameOver.innerHTML = "AI Died Game Over!\n";
      }
    }
  }
  else{
    gameOver.innerHTML = "Loading...\n";
  }
}