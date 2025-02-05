import Icon from './icon';

// Class movingIcon that inherits class Icon and is a superclass of Greedy and Hungry
export default class MovingIcon extends Icon {

    constructor(x, y, imgSrc, deltaX, deltaY){
        super(x, y, imgSrc);

        //speed or diplacement steps
        this.deltaX = deltaX;
        this.deltaY = deltaY;
    }

    /* method move that lets the icons move */
    move(context){
        let w = context.canvas.width;
        let h = context.canvas.height;
        this.x = this.x + this.deltaX;
        this.y = this.y + this.deltaY;
    
        if (this.x < 0) {
          this.deltaX = -this.deltaX;
          this.x = -this.x;
        } else if (this.x > w) {
          this.deltaX = -this.deltaX;
          this.x = 2*w - this.x;
        }
    
        if (this.y < 0) {
          this.deltaY = -this.deltaY;
          this.y = -this.y;
        } else if (this.y > h) {
          this.deltaY = -this.deltaY;
          this.y = 2*h - this.y;
        }
      }
}