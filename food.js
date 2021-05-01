class Food{
    constructor(){
        this.foodStock = 20;
        this.lastFed;
        this.image = loadImage("Milk.png");
    }
    updateFoodStock(foodStock){
        this.foodStock = foodStock
    }
    
    deductFood(){
        if(this.foodStock > 0){
            this.foodStock = this.foodStock - 1
        }
    }

    getFedTime(lastFed){
        this.lastFed=lastFed;
      }

    getFoodStock(){
        return this.foodStock
    }
    display(){
        var x = 80;
        var y = 100;
        imageMode(CENTER);
        image(this.image, 120, 220, 50, 50)

        if(this.foodStock !== 0){
            for(var i = 0; i < this.foodStock; i++){
         if(i % 10 === 0) {
             x = 80; 
             y = y+50
         }
        image(this.image, x, y, 50, 50)   
        x = x+30        
    }
        }
    }

    bedroom(){
        background(bedroom,550,500);  
    }
      
    garden(){
        background(garden,550,500);  
    } 

    washroom(){
        background(washroom,550,500); 
    }

    

}

