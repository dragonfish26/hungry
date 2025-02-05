import Icon from './icon';

import AnanasImg from './assets/images/ananas.png';
import CitronImg from './assets/images/citron.png';
import PommeImg from './assets/images/pomme.png';

const imgs = [AnanasImg, CitronImg, PommeImg];

export default class Fruit extends Icon{

    // max width and height for fruit images
    static FRUIT_WIDTH = 64;
    
    constructor(x, y, imgSrc = imgs[Math.floor(Math.random() * 3)]) {
        super(x, y, imgSrc);

        // image width and height
        this.width = 64;
        this.height = 64;

        this.visible = true;
    }

    isVisible(){
        return this.visible;
    }

    /* set the visibility of the fruit to false */
    makeDisappear() {
        setTimeout(() => {this.visible = false;
        }, 8000)
    }
}