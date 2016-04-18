var score = 0;
var gameState;
var WAITING = 0;
var PLAYING_GAME = 1;
var GAME_OVER = 2;
var snake;
var food;
var enemies;
var bg;
//var logo;

function preload (){
  bg = loadImage ("images/BG1.png");
  //logo = loadImage ("images/logo.png")
}

function setup() {
  createCanvas(500, 500);
  gameState = WAITING;
  
}

function draw() {
  if(gameState == WAITING) {
    background (0);
    //image (logo, 0, 0, 50, 50);
    stroke (255);
    fill (255);
    textSize (14);
    text("PRESS KEY TO PLAY", 190, 500/2);
  }
  else if(gameState == PLAYING_GAME) {
    image (bg, 0, 0, width, height);
    for (var i = 0; i < enemies.length; i++) {
      var enemy = enemies.get(i);
      enemy.attractionPoint(.01, snake.position.x, snake.position.y);
    }
    snake.overlap(food, collect);
    enemies.overlap(snake, dead);
    drawSprites();
    fill (255);
    text (score,30,30);
    if (snake.position.x > width || snake.position.y > height) {
      gameState = GAME_OVER;
    }
  }
  
  else if (gameState == GAME_OVER) {
    background (0);
    image (bg, 0, 0, width, height);
    stroke (255);
    fill (255);
    textSize (14);
    text("GAME OVER", 210, 500/2);
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
    snake.width += 10
    var newEnemy = createSprite(random(width), random(height), 20, 20);
    enemies.add(newEnemy);
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
}
  
function startGame() {
    gameState = PLAYING_GAME;
    score = 0;
    //CREATE THE PLAYER
    snake = createSprite(width/2, height/2, 30, 30);
    //CREATE SOME ENEMIES
    enemies = new Group();
    for (var i = 0; i < 2; i++) {
      var newEnemy = createSprite(random(width), random(height), 20, 20);
      enemies.add(newEnemy);
    }
    //CREATE THE FOOD
    food = createSprite(random(width), random(height), 10, 10);
}