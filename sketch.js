var score = 0;
var gameState;
var WAITING = 0;
var PLAYING_GAME = 1;
var GAME_OVER = 2;
var snake;
var food;
var enemies;
var r = 200;
var bg;


function preload (){
  bg = loadImage ("images/BG1.png");
}

function setup() {
  createCanvas(500, 500);
  gameState = WAITING;
  
}

function draw() {
  if(gameState == WAITING) {
    image (bg, 0, 0, width, height);
    stroke (255);
    fill (255);
    text("PRESS KEY TO PLAY", 200, 500/2);
  }
  else if(gameState == PLAYING_GAME) {
    image (bg, 0, 0, width, height);
    //text("PLAYING GAME", width/2, height/2);
    for (var i = 0; i < enemies.length; i++) {
      var enemy = enemies.get(i);
      enemy.attractionPoint(.01, snake.position.x, snake.position.y);
    }
    snake.overlap(food, collect);
    enemies.overlap(snake, dead);
    drawSprites();
    fill (255);
    text (score,30,30);
  }
  else if (gameState == GAME_OVER) {
    image (bg, 0, 0, width, height);
    stroke (255);
    fill (255);
    text("GAME OVER", 220, 500/2);
  }
}

function dead(collector, collected) {
  collected.remove();
  gameState = GAME_OVER;
}

function collect(collector, collected) {
    collected.remove();
    score++;
    food = createSprite(random(width), random(height), 10, 10);

}

function keyPressed() {
  if(gameState == WAITING) {
    startGame();
  }
  else if (gameState == PLAYING_GAME) {
    if(keyCode == UP_ARROW) {
      //MOVE UP
      snake.setSpeed(3, 270);
    }
    if (keyCode == DOWN_ARROW) {
      //MOVE DOWN
      snake.setSpeed(3, 90);
    }
    if (keyCode == LEFT_ARROW) {
      //MOVE LEFT
      snake.setSpeed(3, 180);

    }
    if (keyCode == RIGHT_ARROW) {
      //MOVE RIGHT
      snake.setSpeed(3, 0);
    }
    
    
  }
  else if (gameState == GAME_OVER) {
    
  }
}
  
function startGame() {
    gameState = PLAYING_GAME;
    score = 0;
    //CREATE THE PLAYER
    snake = createSprite(width/2, height/2, 30, 30);
    //CREATE SOME ENEMIES
    enemies = new Group();
    for (var i = 0; i < 3; i++) {
      var newEnemy = createSprite(random(width), random(height), 20, 20);
      enemies.add(newEnemy);
    }
    //CREATE THE COIN
    food = createSprite(random(width), random(height), 10, 10);
    
    if (snake.position.x < width){
      gameState == GAME_OVER;
    }
  
}