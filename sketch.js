var gameState = "Play";
var ground, groundImage, bg, bgImage;
var mario, mAnimation;
var obstacle, obstacleAnimation, coin, coinsImage;
var score;
var obstaclesGroup, coinsGroup;
var jumpSound, dieSound, checkPointSound;
var collidedAnimation;
var gameOver, gameOverImage, restart, restartImage;
var highScore=0;


function preload() {

  bgImage = loadImage("bg.png");
  groundImage = loadImage("ground2.png");
  mAnimation = loadAnimation("mario00.png", "mario01.png", "mario02.png", "mario03.png");
  obstacleAnimation = loadAnimation("obstacle1.png", "obstacle2.png", "obstacle3.png", "obstacle4.png");
  coinsImage = loadImage("MarioCoin.png");
  dieSound = loadSound("die.mp3");
  jumpSound = loadSound("jump.mp3");
  checkPointSound = loadSound("checkPoint.mp3");
  collidedAnimation = loadAnimation("collided.png");
  restartImage = loadImage("restart.png");
  gameOverImage = loadImage("gameOver.png");
  obstacle1 = loadImage("enemyOne.png")
  obstacle2 = loadImage("enemyTwo.png")
  birdAnimation = loadAnimation("bird1.png","bird2.png", "bird3.png", "bird4.png", "bird5.png")
}

function setup() {
  createCanvas(600, 400);

  bg = createSprite(200, 200, 600, 400);
  bg.addImage(bgImage);
  bg.x = bg.width / 2;
  bg.scale = 1.1;

  ground = createSprite(200, 370, 250, 10);
  ground.addImage(groundImage);
  ground.scale = 1.0;
  console.log(ground.x);

  mario = createSprite(50, 210, 10, 40);
  mario.addAnimation("ani", mAnimation);
  mario.addAnimation("collide", collidedAnimation);
  mario.scale = 1.8;

  restart = createSprite(300, 200);
  restart.addImage(restartImage);
  restart.scale = 0.5;

  gameOver = createSprite(290, 160);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.7;


  coinsGroup = new Group();
  obstaclesGroup = new Group();
  birdsGroup = new Group ()

  score = 0;
  mario.setCollider("rectangle", 0, 0, 35, 35);
  mario.debug = false;
}

function draw() {
  background(210);



  if (gameState === "Play") {
    ground.velocityX = -10;

    if (keyDown("space") && mario.y > 250) {
      mario.velocityY = -10;
      jumpSound.play();

    }
    mario.velocityY = mario.velocityY + 0.8;


    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }


    if (mario.isTouching(obstaclesGroup)) {
      gameState = "End";
      mario.changeAnimation("collide", collidedAnimation);
      dieSound.play();
    }

    for (i = 0; i < coinsGroup.length; i++) {
      if (mario.isTouching(coinsGroup.get(i))) {
        score = score + 1;
        
        if(highScore<score){
          highScore=score;
        }
        
        coinsGroup.get(i).destroy();
      }
    }


    for (i = 0; i < birdsGroup.length; i++) {
      if (mario.isTouching(birdsGroup.get(i))) {
        
        gameState = "End";
      mario.changeAnimation("collide", collidedAnimation);
      dieSound.play();
        
      }
    }

    if (score > 0 && score%100===0) {
      checkPointsound.play();
    }

    obstacles();
    coins();
    fly ()

    gameOver.visible = false;
    restart.visible = false;

  } else if (gameState === "End") {
    ground.velocityX = 0;
    mario.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    coinsGroup.setVelocityXEach(0);
    
    obstaclesGroup.setLifetime=(-1);
    coinsGroup.setLifetime=(-1);
    
    restart.visible = true;
    gameOver.visible = true;
    
    if(mousePressedOver(restart)){
      reset();
    }

  }
  mario.collide(ground);
  drawSprites();

  textSize(18);
  fill(0)
  text("SCORE: " + score, 350, 40);
  textSize(16);
  fill(120);
  text("HighestScore:" + highScore,350,60);
}

function reset(){
  gameState="Play";
  score=0;
  obstaclesGroup.destroyEach();
  coinsGroup.destroyEach();
  mario.changeAnimation("ani", mAnimation);
}

function obstacles() {

  if (frameCount % 30 === 0) {
    obstacle = createSprite(600, 315, 10, 30);
    obstacle.velocityX = -10;

    var position = Math.round(random(1,3))

    switch(position)
    {

      case 1: obstacle.addAnimation("obsAni", obstacleAnimation)
      break;

      case 2: obstacle.addImage("obstacle1", obstacle1)
      break;

      case 3: obstacle.addImage("obstacle2", obstacle2);
      break;

      default: break;

    }
    
    obstacle.scale = 1;
    obstacle.lifetime = 170;
    obstaclesGroup.add(obstacle);

    
  }
}

function coins() {

  if (frameCount % 150 === 0) {
    coin = createSprite(600, 300, 10, 10);
    coin.velocityX = -3;
    coin.addImage(coinsImage);
    coin.scale = 0.7;

    coin.lifetime = 200;
    coin.y = Math.round(random(170, 300));
    coinsGroup.add(coin);
  }
}


function fly ()
{

  if (frameCount % 150 === 0) {
    bird = createSprite(600, 300, 10, 10);
    bird.velocityX = -3;
    bird.addAnimation("flying", birdAnimation);
    bird.scale = 0.09;



    bird.lifetime = 200;
    bird.y = Math.round(random(120, 250));
   birdsGroup.add(bird);
  }
}







