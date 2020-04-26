var loading = true;
var filesToLoad = 13;
var loadCounter = 0;
var canvas_size = 600;
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
var wumpusWorld;
var side_number = 5;

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

}

function setup() {
  var canvas = createCanvas(canvas_size, canvas_size);
  canvas.parent("wumpus");
  loadAssets(loadCallback);
  wumpus_AI_World = new AI_world(side_number);
}

function restart(){
  console.log("restart");
  wumpus_AI_World = new AI_world(side_number);
  let gameOver = document.getElementById("gameover");
  gameOver.innerHTML = "";
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
    score.innerHTML = "Score: " + wumpusWorld.score;
    gameOver.innerHTML = "";
    if(wumpus_AI_World.wumpusworld.gameover){
      if(wumpusWorld.wumpusworld.hero.status){
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