var ground,groundImage;
var mario,marioImage;
var coin,coinImage;
var mushroom,mushroomImage;
var cloud,cloudImage;
var block,blockImage;
var score=0;
var life=3
var gameState="play";
var edges,invisibleGround
var pipe,pipeImage
var gameOver,gameOverImg

function preload(){
groundImage=loadImage("images/groundimage.png");
marioImage=loadImage("images/MarioRight.png");
coinImage=loadImage("images/COIN.png");
mushroomImage=loadImage("images/MUSHROOM.png");
cloudImage=loadImage("images/CLOUD.png");
blockImage=loadImage("images/BLOCKS.png");
pipeImage=loadImage("images/pipe.png");
gameOverImg=loadImage("images/gameOver.png")

}
function setup(){
createCanvas(800,500);
ground=createSprite(0,480,1200,20);
ground.addImage(groundImage);

mario=createSprite(50,400,10,10);
mario.addImage(marioImage); 
mario.scale=0.05

gameOver=createSprite(370,200,10,10)
gameOver.addImage(gameOverImg)
gameOver.scale=0.5

createEdgeSprites()

invisibleGround=createSprite(0,465,1200,10);
invisibleGround.visible=false

coinsGroup=createGroup()
//mushroomGroup=createGroup()
pipeGroup=createGroup()

//mario.debug="true"
//mario.setCollider("circle",20,100,975)
}
function draw() {
background("pink")

text(mouseX+","+mouseY,mouseX,mouseY);
textSize(30)
text("Score:"+score,680,30);
text("Life:"+life,10,25);
if(gameState==="play")
{
  gameOver.visible=false
  if (keyDown("space")&&mario.y>=380)
  {
    mario.velocityY=-8
    }

    mario.velocityY+=0.3
    ground.velocityX=-2;

    if(ground.x<0)
    {
    ground.x=ground.width/2
    }
    if (coinsGroup.isTouching(mario)) {
      score+=5
      coinsGroup.destroyEach()
    }
    if (mushroom.isTouching(mario)) {
      life=life-1
      mushroom.visible=false
    }
    spawnCoins();
    spawnMushrooms();
    spawnPipe();
    
}       

if (life===0) {
  gameState="end"
  ground.velocityX=0
  mario.velocityY=0
  //mushroomGroup.setVelocityXEach(0)
  coinsGroup.setVelocityXEach(0)
  pipeGroup.setVelocityXEach(0)
  gameOver.visible=true
}

mario.collide(invisibleGround);
console.log(mario.y)

  drawSprites();
  

}
function spawnCoins(){
  if(frameCount%100===0){
    coin=createSprite(400,Math.round(random(250,300),20,20))
    coin.addImage(coinImage)
    coin.scale=0.05
    coin.velocityX=-3
    coin.lifetime=150
    coinsGroup.add(coin)
  }
}

function spawnMushrooms(){
  if(frameCount%80===0){
    mushroom=createSprite(500,435,20,20)
    mushroom.addImage(mushroomImage)
    mushroom.scale=0.02
    mushroom.velocityX=-3
    mushroom.lifetime=150
   
  }
}

function spawnPipe(){
if (frameCount%150===0) {
  pipe=createSprite(500,410,20,20)
    pipe.addImage(pipeImage)
    pipe.scale=0.5
    pipe.velocityX=-3
    pipe.lifetime=150
    pipeGroup.add(pipe)
}

}
