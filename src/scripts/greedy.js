import MovingIcon from './movingIcon';

import GreedyImg from './assets/images/greedy.png';

// class Greedy
export default class Greedy extends MovingIcon {

    constructor(x, y, deltaX, deltaY, imgSrc = GreedyImg){
        super(x, y, imgSrc, deltaX, deltaY);

        //image dimensions
        this.width = 64;
        this.height = 64;

        //lifepoint
        this.life = 3;
    }

    /* Greedy's horizontal and vertical displacement steps are 5px */
    moveLeft() {              
        this.deltaX = this.deltaX - 5;   
    }

    moveRight() {
        this.deltaX = this.deltaX + 5;  
    }

    moveUp() {              
        this.deltaY = this.deltaY - 5;   
    }

    moveDown() {
        this.deltaY = this.deltaY + 5;   
    }

    stopMoving() {
        this.deltaX = 0;
        this.deltaY = 0;
    }

    move(box) {             
        this.x = Math.max(0, Math.min(box.width - this.width, this.x + this.deltaX));
        this.y = Math.max(0, Math.min(box.height - this.height, this.y + this.deltaY));
    }

    handleMoveKeys(keyManager) {
        this.stopMoving();    
        if (keyManager.left)  
        this.moveLeft();
        if (keyManager.right) 
        this.moveRight();
        if (keyManager.up) 
        this.moveUp();
        if (keyManager.down) 
        this.moveDown();
    }
}
