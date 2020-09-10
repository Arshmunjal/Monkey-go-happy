var PLAY = 1
var OVER = 0
var gameState = PLAY
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivaltime



function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  
}



function setup() {
 createCanvas(600,200);
  
  monkey = createSprite(50,160,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1

  ground = createSprite(300,195,600,10)
  
  
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
 survivaltime = 0;
}


function draw() {
  background("white");
  
  if(obstacleGroup.isTouching(monkey)){
    gameState = OVER;
  }
 if(FoodGroup.isTouching(monkey)){
   FoodGroup.destroyEach();
    }
  if(gameState === PLAY){
  text("Survival Time: "+ survivaltime, 300,50);
   survivaltime = survivaltime + Math.round(getFrameRate()/60);
   if(keyDown("space")&& monkey.y >= 159) {
        monkey.velocityY = -12;
   }
    monkey.velocityY = monkey.velocityY + 0.8
    
    food();
  Obstacle();
   }
    
  
  
  
    if(gameState === OVER){
      FoodGroup.setVelocityXEach(0);
      obstacleGroup.setVelocityXEach(0);
      
      obstacleGroup.setLifetimeEach(-1);
      FoodGroup.setLifetimeEach(-1);
      
      text("GAME OVER!",300,100);
    }
    
 
  monkey.collide(ground);
  
drawSprites();
  
 }
function food(){
  if (frameCount % 200 === 0){
    
   var banana = createSprite(600,120,10,40);
   banana.y = Math.round(random(75,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 200
    FoodGroup.add(banana);
    }
}
function Obstacle(){
  if (frameCount % 100 === 0){
   var obstacle = createSprite(600,180,10,40);
    obstacle.addImage(obstacleImage)
    obstacle.scale = 0.1;
    obstacle.velocityX = -3
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
  }
}