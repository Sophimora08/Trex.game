var PLAY = 1;
var END = 0;
var gameState = PLAY;
var restart, restartImage;
var gameover, gameoverImage;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var die, jump, chekPoint;
var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  restartImage= loadImage("restart.png");
  gameoverImage=loadImage("gameOver-1.png");
  groundImage = loadImage("ground2.png");
  
  die= loadSound("die.mp3");
  checkPoint= loadSound("checkPoint.mp3");
  jump= loadSound("jump.mp3");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;
  
  trex.setCollider("circle",0,0,40);
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  restart= createSprite(300,150);
  restart.scale=0.8;
  restart.addImage("restart",restartImage);
  gameover=createSprite(300,100);
  gameover.scale=0.8;
  gameover.addImage("gameOver",gameoverImage);
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //crea obtáculos y grupos de nubes
  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  
  console.log("Hello" + 5);
  
  score = 0;
}

function draw() {
  background("white");
  text("Puntuación: "+ score, 500,50);
  console.log(gameState)
  if(gameState === PLAY){
   if (score % 500 === 0 && score!=0){
      checkPoint.play();
    }
    ground.velocityX = -6-frameCount/300;
    score = score + 1;
    if(keyDown("space")&& trex.y >= 160) {
    trex.velocityY = -13;
      jump.play();
    }
    if (ground.x < 0){
    ground.x = ground.width/2;
    }
    spawnClouds();
    spawnObstacles();
    if (trex.isTouching(obstaclesGroup)){
       die.play();
      gameState= END;
    }
    restart.visible=false;
    gameover.visible=false;
  }
  
  else if(gameState === END){
    //detiene el suelo
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-3);
    cloudsGroup.setVelocityXEach(0);
    cloudsGroup.setLifetimeEach(-3);
    trex.changeAnimation("collided" , trex_collided);
    restart.visible=true;
    gameover.visible=true;
    if (mousePressedOver(restart)){
      functionreiniciar();
      
    }
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  trex.collide(invisibleGround);
  
  drawSprites();
}

function functionreiniciar(){
  gameState= PLAY;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.changeAnimation("running", trex_running);
  score=0;
}
function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -6-frameCount/300;

   
    //genera obstáculos al azar
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //asigna escala y ciclo de vida al obstáculo           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //asigna obstáculos al grupo
   obstaclesGroup.add(obstacle);
 }
}




function spawnClouds() {
  //escribe el código aquí para aparecer las nubes
  if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //asigna ciclo de vida a la variable
    cloud.lifetime = 200;
    
    //ajusta la profundidad
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //agrega una nube al grupo
   cloudsGroup.add(cloud);
  }
  
}