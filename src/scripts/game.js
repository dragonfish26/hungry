import KeyManager from './keyManager';
import Greedy from './greedy';
import Fruit from './fruit';
import Hungry from './hungry';


export default class Game {

   #canvas;

   constructor(canvas) {
      this.#canvas = canvas;
      this.greedy = new Greedy(this.#canvas.width /2, this.#canvas.height /2, 5, 5);
      this.context = this.#canvas.getContext("2d");

      this.raf = null;
      this.keyManager = new KeyManager();

      this.timer = null;
      this.fruits = [];

      // initialize list of hungries with 1 new hungry with random coordinates within the canvas
      this.hungries = [new Hungry(this.randomCoord(this.#canvas.width, Hungry.HUNGRY_WIDTH), this.randomCoord(this.#canvas.height, Hungry.HUNGRY_HEIGHT))];
   }

   /** donne accès au canvas correspondant à la zone de jeu */
   get canvas() {
      return this.#canvas;
   }

   /* animate the game*/
   animate(){
    //check if the player has lost
    if (this.greedy.life <= 0){
        this.endofGame();
    }
    
    this.context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

    //manage greedy
    this.greedy.handleMoveKeys(this.keyManager);
    this.greedy.move(this.#canvas);
    this.greedy.draw(this.context);

    //manage fruits
    this.manageFruits();

    //manage hungries
    this.manageHungries();

    // add new hungry if there isn't one in the game
    if (this.hungries.length == 0){
        this.addHungry();
    }
    // draw hungries
    this.drawHungries();

    this.raf = window.requestAnimationFrame(this.animate.bind(this));
   }

   /* start and stop the game */ 
   startAndStop() {
    if (this.raf == null) {
        this.greedy.draw(this.context);
        this.raf = window.requestAnimationFrame(this.animate.bind(this));
        // add a fruit every second
        this.addFruitTimer();
    } else {
        window.cancelAnimationFrame(this.raf);
        this.raf = null;
        clearInterval(this.timer);
    }
    }

    /* returns a random coordinate number (either x or y) within the canvas taking into account its image length */
    randomCoord(canvasLength, objLength){
        return Math.floor(Math.random() * (canvasLength - objLength));
    }

    /* add new fruit to the game */
    addFruit() {
        // create new fruit with random coordinates within the canvas
        const fruit = new Fruit(this.randomCoord(this.#canvas.width, Fruit.FRUIT_WIDTH), this.randomCoord(this.#canvas.height, Fruit.FRUIT_WIDTH));
        this.fruits.push(fruit);
        fruit.makeDisappear();
    }

    /* set interval to add fruit every second */ 
    addFruitTimer(){
        this.timer = setInterval(() => {
            this.addFruit();
        }, 1000)
    }

    /* greedy collides with a hungry */
    greedyCollidesHungry(hungry){
        if (hungry.collisionWith(this.greedy)){
            const i = this.greedy.life;
            const life = document.getElementById("life-"+i);
            this.greedy.life -= 1;
            life.style.display = "none";
        }
    }

    /* add new hungry to the game */
    addHungry(){
        let newHungry = new Hungry(this.randomCoord(this.#canvas.width, Hungry.HUNGRY_WIDTH), this.randomCoord(this.#canvas.height, Hungry.HUNGRY_HEIGHT));
        this.hungries.push(newHungry);
    }

    /* increment greedy score */
    increaseScore(){
        const scoreElement = document.getElementById("score");
        let currentScore = parseInt(scoreElement.innerText.trim()); 
        currentScore += 100; 
        scoreElement.innerText = currentScore; 
    }

    /* manage fruits */
    manageFruits(){
        this.fruits = this.fruits.filter(fruit => {
            // increment score each time greedy eats a fruit
            if (fruit.collisionWith(this.greedy)){
                this.increaseScore(); 
            }
            // draw the fruit if it's visible and not collided with greedy or any hungries
            if (fruit.isVisible() && !fruit.collisionWith(this.greedy) && !this.hungries.some(hungry => hungry.collisionWith(fruit))){
                fruit.draw(this.context);
                return true;
            } else{
                return false;
            }
            });
    }

    /* manage hungries */
    manageHungries(){
        this.hungries.forEach(hungry => {
            // choose target for hungry
            if (!(this.fruits.includes(hungry.getTarget())) | hungry.getTarget() == null){
                hungry.chooseTarget(this);
            } 
            //move hungry
            hungry.move();
            //manage collision with greedy
            this.greedyCollidesHungry(hungry);
            //manage fruits eaten by hungry
            this.fruits.forEach(fruit => {
                if (hungry.collisionWith(fruit)){
                    hungry.eatenFruits +=1;
                }
            });
            //add new hungry every 7 fruits eaten
            if (hungry.eatenFruits == 7){
                this.addHungry();
                hungry.eatenFruits = 0;
            }
        }); 
    }

    /* draw hungries */
    drawHungries(){
        this.hungries = this.hungries.filter(hungry => {
            if (!hungry.collisionWith(this.greedy)){
                hungry.draw(this.context);
                return true;
            } else{
                return false;
            }
        });
    }

    /* display error message at the end of the game */
    endofGame(){
        this.startAndStop();
        alert("Game over! Press OK to restart.");
        location.reload();
    }

    keyDownActionHandler(event) {
        switch (event.key) {
            case "ArrowLeft":
            case "Left":
                this.keyManager.leftPressed();
                break;
            case "ArrowRight":
            case "Right":
                this.keyManager.rightPressed();
                break;
            case "ArrowUp":
            case "Up":
                this.keyManager.upPressed();
                break;
            case "ArrowDown":
            case "Down":
                this.keyManager.downPressed();
                break;
            default: return;
        }
        event.preventDefault();
    }

    keyUpActionHandler(event) {
        switch (event.key) {
            case "ArrowLeft":
            case "Left":
                this.keyManager.leftReleased();
                break;
            case "ArrowRight":
            case "Right":
                this.keyManager.rightReleased();
                break;
            case "ArrowUp":
            case "Up":
                this.keyManager.upReleased();
                break;
            case "ArrowDown":
            case "Down":
                this.keyManager.downReleased();
                break;
            default: return;
        }
        event.preventDefault();
   }
}



