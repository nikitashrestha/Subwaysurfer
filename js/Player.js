class Player{
    constructor(context){
        this.context = context;
        this.image = new Image();
        this.image.src = 'images/man.png';
        this.x = WIDTH/2-60;
        this.y = HEIGHT/2-50;
        this.sX = 0;
        this.sY = 0;
        this.offset = 210;
        this.dx = 300;
        this.isAlive = true;
        this.gravity = 0.98;
        this.jump = 4.6;
        this.speed = 0;
    }

    draw(){
        if(state.CURRENT == state.GAME){
            this.context.drawImage(this.image, this.sX, this.sY, 210, 350, this.x, this.y, 210, 350);
        }
    }

    update(countAnimationFrame){
        if(state.CURRENT == state.GAME){
            if(countAnimationFrame % 1.5 == 0){
                if(this.sX < 3840){
                    this.sX += this.offset;
                }
                else{
                    this.sX = 0;
                }
            }
            
            if(leftKey.CURRENT == leftKey.PRESSED){
                this.x = this.x -  this.dx;
            }
            else if(rightKey.CURRENT == rightKey.PRESSED){
                this.x = this.x + this.dx;
            }
            else if(upKey.CURRENT == upKey.PRESSED){
                this.jumpPlayer();
            }
            this.speed += (this.gravity);
            this.y += this.speed;

            if(this.y >= HEIGHT/2-15){
                this.y = HEIGHT/2-15;
            }
            leftKey.CURRENT = leftKey.NOTPRESSED;
            rightKey.CURRENT = rightKey.NOTPRESSED;
            upKey.CURRENT = upKey.NOTPRESSED;
        }
    }

    jumpPlayer(){
        this.speed = -this.jump;
    }
    
    setPlayer(isAlive){
        this.isAlive = isAlive;
    }

    getPlayerStatus(){
        return this.isAlive;
    }

    getXPos(){
        return this.x;
    }

    getYPos(){
        return this.y;
    }
}