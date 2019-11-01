class Coin{
    constructor(context, imgSrc, lane){
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
        this.player = null;
        this.isDraw = false;
        this.isMagnet = false;
    }

    draw(){
        this.context.drawImage(this.image, this.x, this.y, this.w, this.h);
    }

    update(screenCoordinates, scale, coinX){
        if(state.CURRENT == state.GAME ){
            if(this.isMagnet){
                if(this.player!= null)
                {
                    if(this.lane == this.player.lane){
                        this.x += this.w * -2;
                        this.y += this.h * (1);
                    }
                    else if(this.lane < this.player.lane){
                        if(this.x <= this.player.getXPos()){
                            this.x += this.w * 2;
                            this.y += this.h * (1);
                        }
                    }
    
                    else if(this.lane > this.player.lane){
                        if(this.x >= this.player.getXPos()){
                            this.x += this.w * 2;
                            this.y += this.h * (1);
                        }
                    }
                }
                this.isDraw = true;
            }
            else{
                this.x = screenCoordinates.x + scale * coinX * WIDTH/this.dx;
                this.y = screenCoordinates.y - this.dy;
                this.w = this.image.width * screenCoordinates.w/this.dw;
                this.h = this.image.height * screenCoordinates.w/this.dw;
                this.x += this.w * coinX;
                this.y += this.h * (-1);
            }
        }
        this.frame++;
    }

    setMagnet(isMagnet, player){
        this.isMagnet = isMagnet;
        this.player = player;
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

    getIsDraw(){
        return this.isDraw;
    }

    reset(){
        this.x = this.y = this.h = this.w = 0;
    }
}