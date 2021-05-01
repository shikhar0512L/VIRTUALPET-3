var dog, dogHappy, dogSadgarden, washroom, database, currentTime, bedroom;
var database, foodS, foodStock;
var fedTime, lastFed, feed, addFood, foodObj;
var gameState, readState;

function preload() {
  dogImg = loadImage("Dog.png");
  dogImg2 = loadImage("happydog.png");
  garden = loadImage("Garden.png")
  washroom = loadImage("WashRoom.png")
  bedroom = loadImage("BedRoom.png")
}
function setup() {
  createCanvas(900, 650);
  foodObj = new Food();

  database = firebase.database();
  dog = createSprite(750, 200, 10, 10);
  dog.addImage(dogImg);
  dog.scale = 0.2

  feed = createButton("FEED THE DOG,MAX");
  feed.position(550, 30);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(700, 30);
  addFood.mousePressed(addFoods);

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  //read game state from database
  readState = database.ref('gameState');
  readState.on("value", function (data) {
    gameState = data.val();
  });

}

function draw() {
  background(140, 210, 144);
  foodObj.display();

  currentTime = hour();
  if (currentTime == (lastFed + 1)) {
    update("Playing");
    foodObj.garden();
  } else if (currentTime == (lastFed + 2)) {
    update("Sleeping");
    foodObj.bedroom();
  } else if (currentTime > (lastFed + 2) && currentTime <= (lastFed + 4)) {
    update("Bathing");
    foodObj.washroom();
  } else {
    update("Hungry")
    foodObj.display();
  }

  if (gameState != "Hungry") {
    feed.hide();
    addFood.hide();
    dog.remove();
  } else {
    feed.show();
    addFood.show();
    dog.addImage(dogImg);
  }

  fedTime = database.ref('fedTime');
  fedTime.on('value', function (data) {
    lastFed = data.val();
  })

  fill(255, 255, 254);
  textSize(15);
  if (lastFed >= 12) {
    text("LAST FEED :" + lastFed % 12 + 'PM', 350, 30);
  } else if (lastFed === 0) {
    text("LAST FEED : 12 AM", 350, 30);
  } else {
    text("LAST FEED :" + lastFed + 'AM', 350, 30);
  }
  drawSprites();

}
function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS)
}
function feedDog() {
  dog.addImage(dogImg2)
  foodObj.updateFoodStock(foodObj.getFoodStock() - 1)
  database.ref('/').update({
    Food: foodObj.getFoodStock(), fedTime: hour()
  })
}

//function to add food in stock
function addFoods() {
  foodS++
  database.ref('/').update({
    Food: foodS
  })
}

function update(state) {
  database.ref('/').update({
    gameState: state
  })
}
