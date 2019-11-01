class Railway{
    constructor(context){
        this.context = context;
        this.lines = [];
        this.lineLength = null;
        this.playerX = 0;
        this.roadLength = 300;
        this.position = 0;
        this.x = WIDTH/2 - 60;
        this.dx = 0;
        this.dy = 200;
        this.image = new Image();
        this.image.src = 'images/railway.png';
        this.range = 200;
        this.coinSound = new Audio();
        this.coinSound.src = 'sound/coinsound.ogg';
        this.imageMagnet = new Image();
        this.imageMagnet.src = 'images/magnet.png';
        this.isMagnet = false;
        this.createLines(); 
        this.createCoins();
        this.createPowerUps();
        this.createObstacles();
        this.createScenes();
        this.isDraw = false;
        this.count = 0;
        this.player = new Player(this.context);
    }

    /* ------------------------Creating Lines----------------------------- */
    createLines(){
        for(let i = 0; i < TOTAL; i++){
            let line = new Line(this.context);
            line.setWorldCoordinateZ(i*SEGLEN);
            this.lines.push(line);
        }
        this.lineLength = this.lines.length;
    }

    /* ------------------------Creating Coins----------------------------- */
    createCoins(){
        for(let i = 0; i < TOTAL; i++){
            if(((i > 150 && i < 250) || ( i > 450 && i < 600) || ( i > 750 && i < 1000) || ( i > 1100 && i < 1400) || ( i > 1660 && i < 1900) || ( i > 2100 && i < 2800)) && (i + 7) % 59 == 0){
                this.lines[i].setCoin(coinsSrc.MID, -0.3, 1); 
            }

            if(((i > 250 && i < 500) || ( i > 600 && i < 850) || ( i > 1000 && i < 1200) || ( i > 1450 && i < 1650) || ( i > 1850 && i < 2400)) && (i % 59 == 0)){
                this.lines[i].setCoin(coinsSrc.LEFT, -2.5, 0); 
            }

            if( ((i > 450 && i < 650) || (i > 1405 && i <1600) || (i > 1800 && i <2400)) && (i - 7) % 59 == 0){
                this.lines[i].setCoin(coinsSrc.RIGHT, 2, 2) ;
            }
        }
    }

    /* ------------------------Creating PowerUps----------------------------- */
    createPowerUps(){
        for(let i = 0; i < TOTAL; i++){
            if(i == 1250 ){
                this.lines[i].setPowerUp(scoreBooster, -2.5, 0, powerUpType.scoreBooster);
            }
            if(i == 400){
                this.lines[i].setPowerUp(scoreBooster, 2.2, 2, powerUpType.scoreBooster);
            
            }
            if(i == 2150){
                this.lines[i].setPowerUp(scoreBooster, -0.3, 1, powerUpType.scoreBooster);
            }
            if(i == 1000){
                this.lines[i].setPowerUp(magnetSrc, 2.5, 2, powerUpType.magnet);
            }
            if( i == 1500){
                this.lines[i].setPowerUp(magnetSrc, -2.2, 0, powerUpType.magnet);
            }
        }
    }

    /* ------------------------Creating Obstacles----------------------------- */
    createObstacles(){
        for(let i = 0; i < TOTAL; i++){
            
            
            if( i % 8 == 0 && ((i > 150 && i < 300) || ( i > 900 && i < 1000) || ( i > 1100 && i < 1400) || ( i > 1680 && i < 1780)|| ( i > 2410 && i < 2780))){
                this.lines[i].setObstacle(obstaclesSrc.RIGHT,0.4, 2);
            }

            if( i % 8 == 0 && ((i > 150 && i < 250) || (i > 500 && i < 600) || ( i > 850 && i < 1000) || ( i > 1350 && i < 1450) || ( i > 1690 && i < 1800) || ( i > 2410 && i < 2610))){
                this.lines[i].setObstacle(obstaclesSrc.LEFT,-1.4, 0);
            }

            if( i % 8 == 0 && ((i > 350 && i < 400) || ( i > 650 && i < 750) || ( i > 1505 && i < 1650) || ( i > 1910 && i < 2000))){
                this.lines[i].setObstacle(obstaclesSrc.MID,-0.4, 1);
            }
           
        }
    }

    /* ------------------------Creating Scenes ( Trees and Houses )----------------------------- */
    createScenes(){
        for(let i = 0; i < TOTAL; i++){
            if(i%15==0){
                this.lines[i].setScenes(scenesSrc.TREE1,-4.2);
            }
            if(i%19==0){
                this.lines[i].setScenes(scenesSrc.TREE1,4);
            }
        }
    }

    /* ------------------------Draw Roads----------------------------- */
    drawRoads(startPos){
        let lineObj, prevLineObj;
       
        for(let i = startPos; i < startPos + this.roadLength; i++){

            lineObj = this.lines[i % this.lineLength];
            lineObj.project(this.playerX - this.x, CAMY + camYOffset, this.position + 100 /*- ( i >= this.lineLength? this.lineLength * SEGLEN: 0)*/);

            this.x += this.dx;

            if(lineObj.getScreenCoordinates().y > HEIGHT){
                continue;
            }
            /* ------------------------Define Colors----------------------------- */
            let colorGrass = ( i / 5 ) % 2 ? '#10c810': '#009a00';
            let colorRumble = ( i / 3) % 2 ? '#ffffff' : '#000000';
            let colorRoad = ( i / 12) % 2 ? '#6b6b6b': '#696969';

            if(i > 0){
                prevLineObj= this.lines[(i - 1) % this.lineLength];
            }
            else{
                prevLineObj = lineObj;
            }
            
            /* ------------------------Drawing Road and environment----------------------------- */
            let prevScreenCoordinates = prevLineObj.getScreenCoordinates();
            let currentScreenCoordinates = lineObj.getScreenCoordinates();
            this.polygon(colorGrass, 0, prevScreenCoordinates.y, WIDTH, 0, currentScreenCoordinates.y, WIDTH);
            // this.polygon(colorRumble, prevScreenCoordinates.x, prevScreenCoordinates.y, prevScreenCoordinates.w * 1.2, currentScreenCoordinates.x, currentScreenCoordinates.y, currentScreenCoordinates.w * 1.2);
            this.polygon(colorRoad, prevScreenCoordinates.x, prevScreenCoordinates.y, prevScreenCoordinates.w, currentScreenCoordinates.x, currentScreenCoordinates.y, currentScreenCoordinates.w);
        }
    }

    /* ------------------------Drawing Coins----------------------------- */
    drawCoins(startPos){
        for(let i = startPos + this.roadLength; i > startPos; i--){
            if(this.lines[i%this.lineLength].coin != null){
                this.lines[i % this.lineLength].drawCoin();
            }
        }
    }

    /* ------------------------Drawing PowerUps----------------------------- */
    drawPowerUps(startPos){
        this.count++;
        for(let i = startPos + this.roadLength; i > startPos; i--){
            if(this.lines[i%this.lineLength].powerUp != null){
                this.lines[i % this.lineLength].drawPowerUps();
            }
        }
        if(this.count % 100 == 0){
            this.isMagnet = false;
            this.count = 0;
        }
        if(this.isMagnet){
            this.context.drawImage(this.imageMagnet, 600, 0, 60, 60);
        }
    }

    /* ------------------------Drawing Obstacles----------------------------- */
    drawObstacles(startPos){
        for(let i = startPos + this.roadLength; i > startPos; i--){
            if(this.lines[i%this.lineLength].obstacle != null){
                this.lines[i % this.lineLength].drawObstacle();
            }
        }
    }

    /* ------------------------Drawing Scenes----------------------------- */
    drawScenes(startPos){
        for(let i = startPos + this.roadLength; i > startPos; i--){
            if(this.lines[i%this.lineLength].scene != null){
                this.lines[i % this.lineLength].drawScene();
            }
        }
    }

    /* ------------------------Drawing road , scenes, obstacles and coins----------------------------- */
    draw(){
        
        let startPos = this.position/SEGLEN; 
        this.drawRoads(startPos);
        this.drawScenes(startPos);
        this.drawPowerUps(startPos);
        this.drawCoins(startPos);
        this.drawObstacles(startPos);
        this.player.draw();
        // this.scoreBoard.draw();
    }

    /* ------------------------Update game environment----------------------------- */
    update(countAnimationFrame, scoreBoard){
        if(state.CURRENT == state.GAME && this.player.getPlayerStatus() == true){
            this.playerX = this.player.getXPos();
            this.position = (this.position + this.dy);
            this.player.update();

            if(countAnimationFrame % 25 == 0){
                scoreBoard.updateScore(null);
            }

            for(let i = 0; i < this.lines.length; i++){
                /* Checing Collsion with player in each frame*/
                if(this.lines[i].checkCoinCollision(this.player)){
                    this.coinSound.play();
                    this.lines[i].coin = null;
                    scoreBoard.updateCoin();
                }

                if(this.lines[i].checkPowerUpCollision(this.player)){
                    this.coinSound.play();
                    if(this.lines[i].powerUp.getType() == powerUpType.scoreBooster){
                        scoreBoard.updateScore(this.lines[i].powerUp);
                    }

                    else if(this.lines[i].powerUp.getType() == powerUpType.magnet){
                        this.isMagnet = true;
                        for(let j = i ;j <= this.range + i; j++){
                            if(this.lines[j].coin != null){
                                this.lines[j].coin.setMagnet(this.isMagnet, this.player);
                                // while(this.lines[j].coin.getXPos() == this.player.getXPos())
                                if(this.lines[j].coin.getIsDraw()){
                                    this.lines[j].coin = null;
                                }
                                
                                scoreBoard.updateCoin();
                            }
                        }
                    }
                    this.lines[i].powerUp = null;
                }

                if(this.lines[i].checkObstacleCollision(this.player)){
                    this.lines[i].obstacle = null;
                    this.player.setPlayer(false);
                    state.CURRENT = state.OVER; 
                }
            }
        }
    }

    /* ------------------------Drawing Polygon Shape----------------------------- */
    polygon(color, x1, y1, w1, x2, y2, w2){
        this.context.beginPath();
        this.context.moveTo(x1 - w1, y1);
        this.context.lineTo(x2 - w2, y2);
        this.context.lineTo(x2 + w2, y2);
        this.context.lineTo(x1 + w1, y1);
        this.context.fillStyle = color;
        this.context.fill();
        this.context.closePath();
    }

    reset(){
        this.x = WIDTH/2 - 60;
        this.playerX = this.position = 0;
        
        this.lines = [];
        this.createLines();
        this.createScenes();
        this.createObstacles();
        this.createPowerUps();
        this.createCoins();
        this.player.reset();
    }
}