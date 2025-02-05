import MovingIcon from './movingIcon';

import HungryImg from './assets/images/hungry.png';

// class Hungry
export default class Hungry extends MovingIcon {

  //hungry image dimensions 
  static HUNGRY_WIDTH = 64;
  static HUNGRY_HEIGHT = 57;

  constructor(x, y, deltaX = 2, deltaY = 2, imgSrc = HungryImg){
    super(x, y, imgSrc, deltaX, deltaY);

    this.width = 64;
    this.height = 57;

    //target to move toward
    this.target = null;

    //number of fruits eaten
    this.eatenFruits = 0;
  }

  getTarget(){
    return this.target;
  }

  chooseTarget(game) {
    let fruits = game.fruits;
    if(fruits.length > 0){
      let randomIndex = Math.floor(Math.random() * fruits.length);
      this.target = fruits[randomIndex];
    } else {
      this.target = game.greedy;
    }
  }

  move() {
    let t = this.target;
    const distance = Math.sqrt(Math.pow(t.x - this.x, 2) + Math.pow(t.y - this.y, 2));
    this.deltaX = (t.x - this.x) / distance;
    this.deltaY = (t.y - this.y) / distance;
    this.x += this.deltaX;
    this.y += this.deltaY;
  }

}
