var score = 0;
var gameState;
var WAITING = 0;
var PLAYING_GAME = 1;
var GAME_OVER = 2;
var snake;
var food;
var enemies;
var bg;
var a;
var a2;
var p1;
var p2;
var song;
var bg1;

function preload (){
  song = loadSound ("sound/Light-Years.mp3")
  bg = loadImage ("images/bg2.png");
  bg1 = loadImage ("images/bg3.png");
  a = loadImage ("images/a11.png");
  a2 = loadImage ("images/a2.png");
  p1 = loadImage ("images/p1.png");
  p2 = loadImage ("images/p2.png");
}

function setup() {
  createCanvas(600, 550);
  gameState = WAITING;
}

function draw() {
  if(gameState == WAITING) {
    image (bg1, 0, 0, width, height);
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
    if (snake.position.x > width || snake.position.y > height || snake.position.x < 0 || snake.position.y < 0) {
      gameState = GAME_OVER;
    }
  }
  
  else if (gameState == GAME_OVER) {
    background (0);
    image (bg, 0, 0, width, height);
    stroke (255);
    fill (255);
    textSize (14);
    text("GAME OVER", 250, 280);
  }
}

function dead(collector, collected) {
  collected.remove();
  gameState = GAME_OVER;
}

function collect(collector, collected) {
    collected.remove();
    score++;
    createFood ()
    snake.width += 10
    score += collected.points;
    var newEnemy = createSprite(random(width), random(height), 20, 20);
    enemies.add(newEnemy);
    newEnemy.addImage(a2);
}

function keyPressed() {
  if(gameState == WAITING) {
    startGame();
    song.loop();
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
    snake = createSprite(width/2, height/2, 35, 20);
    //CREATE SOME ENEMIES
    enemies = new Group();
    for (var i = 0; i < 3; i++) {
      var newEnemy = createSprite(random(width), random(height), 30, 30);
      enemies.add(newEnemy);
      newEnemy.addImage(a);
  }
    createFood ();
}

function createFood (){
  var s = random (0,50);
  if (s > 25) {
    food = createSprite(random(width), random(height), 10,10);
    food.points = 25;
    food.addImage(p1);
  }
  else {
    food = createSprite (random(width), random(height), 20,20);
    food.points = 1;
    food.addImage(p2);
  }
}
