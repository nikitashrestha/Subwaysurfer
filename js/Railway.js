class Railway{
    constructor(context){
        this.context = context;
        this.lines = [];
        this.lineLength = null;
        this.playerX = 0;
        this.roadLength = 300;
        this.position = 0;
        this.x = 0;
        this.dx = 0;
        this.dy = 200;
        this.camH = 0;
        this.image = new Image();
        this.image.src = 'images/railway.png';
        this.createLines(); 
        this.createCoins();
        this.createObstacles();
        this.createScenes();
        this.player = new Player(this.context);
        this.scoreBoard = new ScoreBoard(this.context);
    }

    /* ------------------------Creating Lines----------------------------- */
    createLines(){
        for(let i = 0; i < TOTAL; i++){
            let line = new Line(this.context);
            line.setWorldCoordinateZ(i*SEGLEN);
            if(i > 300 && i < 700){
                line.setCurve(0.5);
            }
            if(i >1100 && i < 1400){
                line.setCurve(-0.8);
            }
            this.lines.push(line);
        }
        this.lineLength = this.lines.length;
    }

    /* ------------------------Creating Coins----------------------------- */
    createCoins(){
        for(let i = 0; i < TOTAL; i++)
        {
            if( i > 150 && ( i + 21 ) % 59 == 0)
                {
                    this.lines[i].setCoin(coinsSrc.MID, 0);   
                }
            if( i > 150 && i % 59 == 0)
                {
                    this.lines[i].setCoin(coinsSrc.MID, -2.5); 
                }
            if( i > 101 && (i - 21) % 49 == 0)
                {
                    this.lines[i].setCoin(coinsSrc.MID, 2.2) ;
                }
        }
    }

    /* ------------------------Creating Obstacles----------------------------- */
    createObstacles(){
        for(let i = 0; i < TOTAL; i++){
            
            if(i==551||i==1551||i==1951){
                this.lines[i].setObstacle(obstaclesSrc.LEFT, -0.1, true); 
            }

            if(i==301||i==701||i==1351||i==2291){
                this.lines[i].setObstacle(obstaclesSrc.MID, -1.5, true);
            }
            
            if(i==1151||i==1751||i==2491){
                this.lines[i].setObstacle(obstaclesSrc.MID,0.5, true);
            }
        }
    }

    /* ------------------------Creating Scenes ( Trees and Houses )----------------------------- */
    createScenes(){
        for(let i = 0; i < TOTAL; i++){
            if(i>0 && i<451 && i%15==0){
                this.lines[i].setScenes(scenesSrc.TREE1,-4.2);
            }
            if(i>55 && i<1000 && i%19==0){
                this.lines[i].setScenes(scenesSrc.TREE1,4);
            }
            if( i>1800 && (i-99)%91==0){
                this.lines[i].setScenes(scenesSrc.TREE2,-2);
            }
            if( i>1600 && i%151==0){
                this.lines[i].setScenes(scenesSrc.TREE2,3);
            }

            if(i==251){
                this.lines[i].setScenes(scenesSrc.SIGN,-4.5);
            }
            if(i==1051){
                this.lines[i].setScenes(scenesSrc.SIGN,3.5);
            }
            if(i>1300 && i<2200 && i%101==0){
                this.lines[i].setScenes(scenesSrc.HOUSE1,-1.7);
            }
            if(i>555 && i<851 && i%29==0){
                this.lines[i].setScenes(scenesSrc.HOUSE2,0.8);
            }
        }
    }

    drawRoads(startPos){
        let lineObj, prevLineObj;
        this.x = 0;
        this.dx = 0;
        this.camH = CAMY + this.lines[startPos].getYPos();
        
        for(let i = startPos; i < startPos + this.roadLength; i++){

            lineObj = this.lines[i % this.lineLength];
            lineObj.project(this.playerX - this.x, this.camH, this.position /*- ( i >= this.lineLength? this.lineLength * SEGLEN: 0)*/);

            this.x += this.dx;
            this.dx += lineObj.getCurve();

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
            this.polygon(colorRumble, prevScreenCoordinates.x, prevScreenCoordinates.y, prevScreenCoordinates.w * 1.2, currentScreenCoordinates.x, currentScreenCoordinates.y, currentScreenCoordinates.w * 1.2);
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
        if(state.CURRENT == state.GAME){
            let startPos = this.position/SEGLEN; 
            this.drawRoads(startPos);
            this.drawScenes(startPos);
            this.drawObstacles(startPos);
            this.drawCoins(startPos);
            this.player.draw();
            this.scoreBoard.draw();
        }
    }

    /* ------------------------Update game environment----------------------------- */
    update(countAnimationFrame){
        if(state.CURRENT == state.GAME && this.player.getPlayerStatus() == true){
            this.playerX = this.player.getXPos();
            this.position = (this.position + this.dy);
            // if(this.player.getPlayerStatus())
            //     this.position+=this.dy;

            // if(this.position >= this.lineLength*SEGLEN)
            //     this.position-=this.lineLength*SEGLEN;
            // if(this.position < 0)
            //     this.position += this.lineLength*SEGLEN;
            this.player.update(countAnimationFrame);
            if(countAnimationFrame % 25 == 0){
                this.scoreBoard.updateScore();
            }
            for(let i = 0; i < this.lines.length; i++){
                if(this.lines[i].checkCoinCollision(this.player)){
                    this.lines[i].coin = null;
                    this.scoreBoard.updateCoin();
                }
                // if(this.lines[i].checkObstacleCollision(this.player)){
                //     this.lines[i].obstacle = null;
                //     this.player.setPlayer(false);
                //     state.CURRENT = state.OVER;
                //     console.log('obstacle');
                    
                // }
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
        this.x = this.playerX = this.position = this.camH = 0;
        this.lines = [];
        this.lineLength = null;
    }

    getRandomNumber(min,max){
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) ) + min;
    }
}