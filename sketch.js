var ghost, ghostImage;
var climber, climberImage, climberGroup;
var tower, towerIm, spooky;
var door, doorIm, doorGroup;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload (){
  climberImage = loadImage("climber.png");
  doorIm = loadImage("door.png");
  towerIm = loadImage("tower.png");
  ghostImage = loadImage("ghost-standing.png");
  
  spooky = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600, 600);
  spooky.loop();
  
  tower = createSprite(300, 300);
  tower.addImage("tower", towerIm);
  tower.velocityY = 1;
  
  doorGroup = createGroup();
  climberGroup = createGroup();
  invisibleBlockGroup =  createGroup();
  
  ghost = createSprite(200, 200, 50, 50);
  ghost.addImage("ghost", ghostImage);
  ghost.scale = 0.3;
}

function draw(){
  background(0);
  if(gameState === "play"){
    
  if(keyDown("space")){
     ghost.velocityY = -10;
     }
    
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }
    
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }
     
    ghost.velocityY = ghost.velocityY + 0.8
    
    if(tower.y > 600){
     tower.y = tower.width/2;
     }
     spawnDoor();
  
    //climberGroup.collide(ghost);
    if(climberGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end"
    }
    drawSprites();
  }

   if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }
  
}

function spawnDoor(){
  
  if (frameCount % 240 === 0 ){
    door = createSprite(200, 0);
    door.addImage("door", doorIm);
    door.x = Math.round(random(120, 400));
    door.velocityY = 1;
    door.lifetime = 500;
    doorGroup.add(door);
    
    climber = createSprite(200, 60);
    climber.addImage("climber", climberImage);
    climber.velocityY = 1;
    climber.x = door.x;
    climber.lifetime = 500;
    climberGroup.add(climber);
    
    door.depth = ghost.depth;
    door.depth = 1;
    
    var invisibleBlock = createSprite(200,60);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;
    invisibleBlockGroup.add(invisibleBlock);
    
  }
  
}
