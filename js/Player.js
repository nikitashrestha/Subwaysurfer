class Player{
    constructor(context){
        this.context = context;
        this.image = new Image();
        this.image.src = 'images/man.png';
        this.x = [WIDTH/2-400,WIDTH/2 - 30, WIDTH/2+300];
        this.y = HEIGHT/2 + 40;
        this.currenXIndex = 1;
        this.sX = 0;
        this.sY = 0;
        this.offset = 210;
        this.isAlive = true;
        this.gravity = 0.98;
        this.jump = 30;
        this.speed = 0;
        this.turnSound  = new Audio();
        this.frame = 0;
        this.isFalling = false;
        this.turnSound.src = 'sound/turnsound.ogg';
        this.lane = 1;
        this.h = 350;
        this.w = 210;
    }

    draw(){
        this.context.drawImage(this.image, this.sX, this.sY, this.w, this.h, this.x[this.currenXIndex], this.y, this.w, this.h);
    }

    update(){
        if(state.CURRENT == state.GAME){
            if(this.frame % 2 == 0){
                this.sX = (this.sX += this.offset) % (this.offset*27);
            }
            this.frame++;
            
            if(this.currenXIndex >= 1 && leftKey.CURRENT == leftKey.PRESSED){
                this.turnSound.play();
                this.currenXIndex -= 1;
                this.lane -= 1;
            }
            else if(rightKey.CURRENT == rightKey.PRESSED && this.currenXIndex <= 1){
                this.turnSound.play();
                this.currenXIndex += 1;
                this.lane += 1;
            }
            else if(upKey.CURRENT == upKey.PRESSED){
                this.isFalling = true;
                this.jumpPlayer();
            }
            this.speed += (this.gravity);
            this.y += this.speed;
            if(this.y >= HEIGHT/2-15){
                this.y = HEIGHT/2-15;
                this.isFalling = false;
                camYOffset = 0;
            }
            
            leftKey.CURRENT = leftKey.NOTPRESSED;
            rightKey.CURRENT = rightKey.NOTPRESSED;
            upKey.CURRENT = upKey.NOTPRESSED;
        }
    }

    jumpPlayer(){
        this.speed = -this.jump;
        camYOffset = 500;
    }
    
    setPlayer(isAlive){
        this.isAlive = isAlive;
    }

    getPlayerStatus(){
        return this.isAlive;
    }

    getXPos(){
        return this.x[this.currenXIndex];
    }

    getYPos(){
        return this.y;
    }

    reset(){
        this.isFalling = false;
        this.isAlive = true;
        this.sX = this.sY = 0;
        this.currenXIndex = 1;
        this.y = HEIGHT/2 + 40;
        this.lane = 1;
    }
}