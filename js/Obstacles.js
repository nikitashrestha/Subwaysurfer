class Obstacles{
    constructor(context, imgSrc, lane ){
        this.context = context;
        this.image = new Image();
        this.image.src = imgSrc;
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.dy = this.dx =0.02;
        this.dw = 266;
        this.lane = lane;
    }

    draw(){
        this.context.drawImage(this.image, this.x, this.y, this.w, this.h);
    }

    update(screenCoordinates, scale, obstacleX){
        if(state.CURRENT == state.GAME){
            this.x = screenCoordinates.x + scale * obstacleX * WIDTH/this.dx;
            this.y = screenCoordinates.y;
            this.w = this.image.width * screenCoordinates.w/this.dw;
            this.h = this.image.height * screenCoordinates.w/this.dw;
            this.x += this.w * obstacleX;
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

    getHeight(){
        return this.h;
    }

    reset(){
        this.x = this.y = this.h = this.w = 0;
    }
}

