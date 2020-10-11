/* mam, I added a new score that shows the bananas collected and per banana you take you get two bananas and the score is based upon survival time. There is a problem and the text is not appearing.  The monkey gets big every 10, 20, 30 etc. bananas it takes. If it his an obstacle 3 times, the game is over. When the game is over, to restart, click r. */

var player,monkey_running;
var invisibleGround;
var bananaGroup, obstacleGroup;
var bananaImage, obstacle_img;
var backgroundj, score = 0, backImage;
var gameState = PLAY;
var PLAY = 0;
var END = 1;
var hit = 0;
var bananas = 0;

function preload (){
  backImage = loadImage("jungle.jpg");
  
monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  obstacle_img = loadImage("stone.png");
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
}

function setup() {
  
  createCanvas(400, 400);
  
  player = createSprite(100, 340, 20, 50);
  player.addAnimation("running", monkey_running);
  player.scale = 0.12;
  
  invisibleGround = createSprite(200,390,400,10);
  invisibleGround.visible = false;
  
  backgroundj = createSprite(200,180,400,20);
  backgroundj.addImage("background",backImage);
  backgroundj.x = backgroundj.width /2;
  backgroundj.velocityX = -2;
  
  backgroundj.depth = player.depth;
  player.depth = player.depth + 1;

  gameState = PLAY;
  
  player.setCollider("circle", 0, 0, 300);
  
  backgroundj.depth = obstacleGroup.depth;
  obstacleGroup.depth = obstacleGroup.depth + 1;
}

function draw() {
  
  background(backImage);
  edges = createEdgeSprites();
  
  //console.log(player.debug = true);
  
  player.velocityY = player.velocityY + 0.8
  
if(gameState === PLAY){
  
  backgroundj.depth = player.depth;
    player.depth = player.depth + 1;
  
   if(keyDown("space") && player.y >= 310) {
    player.velocityY = -14;
  } 
  //console.log(player.velocityY);
  //console.log(bananas);
 
  score = score + Math.round(getFrameRate()/60);

  spawnBananas();
  spawnObstacles();
  
  if(player.isTouching(bananaGroup)){
     bananas = bananas + 2;
    switch(bananas){
      case 10: player.scale = 0.12;
        break;
      case 20: player.scale = 0.14;
        break;
      case 30: player.scale = 0.16;
        break;
      case 40: player.scale = 0.18;
        break;
        default: break;
    }
    bananaGroup.destroyEach();
  }
  
  if(obstacleGroup.isTouching(player)){
    if(hit === 0 || hit === 1){
       player.scale = 0.12;
      hit = hit + 1;
      obstacleGroup.destroyEach();
      }
    
    else if(hit === 2){
       player.scale = 0.12;
       player.velocityY = 0;
      gameState = END;
    }
  }
}
  
if(gameState === END){
  stroke("white");
  textSize(30);
  fill("red");
  text("GAME OVER!", 100, 100);
  text("Click 'r' to Reset", 100, 200);
  
  player.velocityY = 0;
  obstacleGroup.setVelocityXEach(0);
  obstacleGroup.setVelocityYEach(0);
  bananaGroup.setVelocityXEach(0);
  bananaGroup.setVelocityYEach(0);
  
  obstacleGroup.setLifetimeEach(-1);
  bananaGroup.setLifetimeEach(-1);
  
  backgroundj.velocityX = 0;
  
  if(keyDown("r")){
     restart();
  }
}
   
  stroke("white");
  textSize(20);
  fill("white");
  text("score: " + score, 200, 200);
  text("Bananas: " + bananas, 200, 100);
  
   if (backgroundj.x < 0){
   backgroundj.x = backgroundj.width/2;
  }
  
  player.collide(invisibleGround);
  drawSprites();
}

// function to spawn bananas
function spawnBananas (){
    if (frameCount % 80 === 0) { //110
    var banana = createSprite(400,222,40,10);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -4;
    
     //assign lifetime to the variable
    banana.lifetime = 190;
      
      backgroundj.depth = banana.depth;
    banana.depth = banana.depth + 1;
      
      //console.log(banana.debug = true);
    
    //add each cloud to the group
    bananaGroup.add(banana);
  }
}

// function to spawn obstacles
function spawnObstacles(){
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(400,340,10,40);
    obstacle.velocityX = - (4 + 3 * score / 150);
    obstacle.addImage(obstacle_img);
    obstacle.scale = 0.2;
    
      obstacle.lifetime = 190;
                     
    backgroundj.depth = obstacle.depth;
    obstacle.depth = obstacle.depth + 1;
    
    if(obstacleGroup.isTouching(player)){
       obstacleGroup.velocityX = 0;
    }
    
    //console.log(obstacle.debug = true);
    
    obstacle.setCollider("circle", 0, 0, 150);
    obstacleGroup.add(obstacle);
  }
}

// function to restart the game
function restart(){
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  score = 0;
  bananas = 0;
  gameState = PLAY;
  obstacleGroup.setLifetimeEach(190);
  bananaGroup.setLifetimeEach(190);
  backgroundj.velocityX = -2;
}
