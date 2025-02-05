
// class Icon, superclass of Greedy and MovingIcon (Greedy, Hungry)
export default class Icon {

    constructor(x, y, imgSrc){
        //coordinates
        this.x = x;
        this.y = y;

        //image
        this.image = this.createImage(imgSrc);
    }

    getx(){
        return this.x;
    }

    gety(){
        return this.y;
    }

    /* Create image object to draw this icon */
    createImage(imageSource) {
        const newImg = new Image();
        newImg.src = imageSource;
        return newImg;
    }

    /* draw this ball, using the given drawing 2d context */
    draw(context) {
        //if (this.constructor.name=='Hungry')
            //console.log(`${this.constructor.name} ${this.x} ${this.y}`);
        context.drawImage(this.image, this.x, this.y); 
    }

    /* collision with another icon - boolean */

    collisionWith(icon){

        const p1x = Math.max(this.x, icon.x);
        const p1y = Math.max(this.y, icon.y);
        
        const p2x = Math.min(this.x + this.width, icon.x + icon.width);
        const p2y = Math.min(this.y + this.height, icon.y + icon.height);
        
        return (p1x < p2x && p1y < p2y);
      }
}