class PowerUps{
    constructor(context, imgSrc, lane, type){
        this.context = context;
        this.image = new Image();
        this.image.src = imgSrc;
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.dy = this.dx =2;
        this.dw = 266;
        this.lane = lane;
        this.type = type;
    }

    draw(){
        this.context.drawImage(this.image, this.x, this.y, this.w, this.h);
    }

    update(screenCoordinates, scale, powerX){
        if(state.CURRENT == state.GAME){
            this.x = screenCoordinates.x + scale * powerX * WIDTH/this.dx;
            this.y = screenCoordinates.y - this.dy;
            this.w = this.image.width * screenCoordinates.w/this.dw;
            this.h = this.image.height * screenCoordinates.w/this.dw;
            this.x += this.w * powerX;
            this.y += this.h * (-1);
        }
    }

    getXPos(){
        return this.x;
    }

    getYPos(){
        return this.y;
    }

    getWidth(){
        return this.w;
    }

    getType(){
        return this.type;
    }
    
    reset(){
        this.x = this.y = this.h = this.w = 0;
    }

}