var  dog, happyDog, database, foodS, foodStock, dogImg, happyDogImg, milk, milkImg, food, foodImg, bgImg;

function preload(){
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
  milkImg = loadImage("images/milk.png");
  foodImg = loadImage("images/food.png");
  bgImg = loadImage("images/bg.png")
}

function setup() {
  createCanvas(500, 500);
  
  dog = createSprite(250, 350);
  dog.addImage(dogImg);
  dog.scale = 0.6;

  milk = createSprite(160, 375);
  milk.addImage(milkImg);
  milk.scale = 0.09;
  milk.visible = false;

  food = createSprite(150, 400);
  food.addImage(foodImg);
  food.scale = 0.2;
  food.visible = false;

  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(bgImg);
  var number = Math.round(random(1, 2));
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    
  if(foodS !== 0){
    dog.addImage(happyDogImg)
    dog.scale = 0.3;
    if (number === 1){
        food.visible = true;
        milk.visible = false;
    }
    else{
      milk.visible = true;
      food.visible = false;
    }
  }
  else{
    dog.addImage(dogImg);
    dog.scale = 0.6;
    food.visible = false;
    milk.visible = false;
  }
}
if(foodS === undefined){
  foodS = 20
}

  drawSprites();
  textSize(20)
  fill("black")
  stroke(3)
  text("Press the up arrow key to feed your pet", 70, 50)
  text("Food Remaining: "+foodS, 150, 100)
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x = 0
  }
  else{
    x = x - 1
  }

  database.ref('/').update({
    Food:x
  })
}



