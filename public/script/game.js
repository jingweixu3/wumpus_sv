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
  wumpusWorld = new Wumpus_world(side_number);
  wumpusWorld.initialize_cell_status();
}

function restart(){
  console.log("restart");
  wumpusWorld = new Wumpus_world(side_number);
  wumpusWorld.initialize_cell_status();
  let gameOver = document.getElementById("gameover");
  gameOver.innerHTML = "";
  bell_sound.stop();
  ghost_sound.stop();
  wind_sound.stop();
  victory_sound.stop();
  lose_sound.stop();
}

function loadCallback() {
  loadCounter++;
  if (loadCounter == filesToLoad) {
      loading = false;
      console.log("finish loading...");
  }
}
function keyPressed() {
  // console.log(keyCode);
  if(!loading){
    if (keyCode === UP_ARROW) {
      wumpusWorld.hero.turnUp();
    }
    else if (keyCode === DOWN_ARROW) {
      wumpusWorld.hero.turnDown();
    } 
    else if (keyCode === LEFT_ARROW) {
      wumpusWorld.hero.turnLeft();
  
    } 
    else if (keyCode === RIGHT_ARROW) {
      wumpusWorld.hero.turnRight();
    } 
    //shoot enter
    else if (keyCode === ENTER) {
      wumpusWorld.hero.shoot();
    } 
    // pick up key/escape space
    else if (keyCode === 32){
      wumpusWorld.hero.pickUpGoldKey();
    }
  }
}


function draw() {
  background(255);
  smooth();
  let gameOver = document.getElementById("gameover");
  let score = document.getElementById("score");
  if(!loading){
    wumpusWorld.display();
    score.innerHTML = "Score: " + wumpusWorld.score;
    gameOver.innerHTML = "";
    if(wumpusWorld.gameover){
      if(wumpusWorld.hero.status){
          gameOver.innerHTML = "Climb out of the Cave!\n";
      }
      else{
        gameOver.innerHTML = "You Died Game Over!\n";
      }
    }
  }
  else{
    gameOver.innerHTML = "Loading...\n";
  }
}