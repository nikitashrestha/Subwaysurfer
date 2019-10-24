class Scene{
    constructor(context, imgSrc){
        this.context = context;
        this.image = new Image();
        this.image.src = imgSrc;
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.dx = this.dy = 2;
        this.dw = 266;
    }

    draw(){
        this.context.drawImage(this.image, this.x, this.y, this.w, this.h);
    }

    update(screenCoordinates, scale, coinX){
        this.x = screenCoordinates.x + scale * coinX * WIDTH/this.dx;
        this.y = screenCoordinates.y - this.dy;
        this.w = this.image.width * screenCoordinates.w/this.dw;
        this.h = this.image.height * screenCoordinates.w/this.dw;

        this.x += this.w * coinX;
        this.y += this.h * (-1);
    }

    reset(){
        this.x = this.y = this.w = this.h = 0;
    }
}