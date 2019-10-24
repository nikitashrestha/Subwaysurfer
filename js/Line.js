class Line{
    constructor(context){
        this.context = context;
        //3d center of the line
        this.worldCoordinate = {
            x: 0,
            y: 0,
            z: 0,
        };

        //Screen Coordinates
        this.screenCoordinates = {
            x: null,
            y: null,
            w: null
        };

        //Scaling Factor
        this.scale = 0;
        //For curve road
        this.curve = 0;
        this.trackX = 0;
        this.track = null
        this.coinX = 0;
        this.obstacleX = 0;
        this.sceneX = 0;
        this.sceneSrc = null;
        this.scene = null;
        this.obstacleSrc = null;
        this.obstacle = null;
        this.coinSrc = null;
        this.coin = null;
    }

    /* ------------------------Projection function to project each lines----------------------------- */
    project(camX, camY, camZ){
        this.scale = CAMDEPTH/(this.worldCoordinate.z - camZ);
        this.screenCoordinates.x = ( 1 + this.scale * (this.worldCoordinate.x - camX)) * WIDTH/2;
        this.screenCoordinates.y = ( 1 - this.scale * (this.worldCoordinate.y - camY)) * HEIGHT/2;
        this.screenCoordinates.w = this.scale * ROADW * WIDTH/2;
    }

    /* ------------------------Setter for WorldCoordinateZ----------------------------- */
    setWorldCoordinateZ(z){
        this.worldCoordinate.z = z;
    }

    /* ------------------------Setter for curve----------------------------- */
    setCurve(curve){
        this.curve = curve;
    }

    /* ------------------------Setter for coin----------------------------- */
    setCoin(coinSrc, coinX){
        this.coinX = coinX;
        this.coinSrc = coinSrc;
        this.coin = new Coin(this.context, this.coinSrc);
    }

    /* ------------------------Setter for obstacle----------------------------- */
    setObstacle(obstacleSrc, obstacleX, type){
        this.obstacleX = obstacleX;
        this.obstacleSrc = obstacleSrc;
        this.obstacle = new Obstacles(this.context, this.obstacleSrc, type);
    }
    
    /* ------------------------Setter for scene----------------------------- */
    setScenes(sceneSrc, sceneX){
        this.sceneX = sceneX;
        this.sceneSrc = sceneSrc;
        this.scene = new Scene(this.context, this.sceneSrc);
    }
    
    /* ------------------------Getter for ScreenCoordinates----------------------------- */
    getScreenCoordinates(){
        return this.screenCoordinates;
    }

    getYPos(){
        return this.worldCoordinate.y;
    }

    /* ------------------------Getter for WorldCoordinates----------------------------- */
    getworldCoordinates(){
        return this.worldCoordinate;
    }

    /* ------------------------Getter for Curve Value----------------------------- */
    getCurve(){
        return this.curve;
    }

    /* ------------------------Getter for scale value----------------------------- */
    getScale(){
        return this.scale;
    }

    /* ------------------------Below functions are to draw and update each projected assets on the line----------------------------- */
    drawCoin(){
        this.updateCoin();
        this.coin.draw();
    }

    drawObstacle(){
        this.updateObstacle();
        this.obstacle.draw();
    }

    drawScene(){
        this.updateScene();
        this.scene.draw();
    }

    updateCoin(){
        this.coin.update(this.screenCoordinates,this.scale, this.coinX);
    }

    updateObstacle(){
        this.obstacle.update(this.screenCoordinates, this.scale, this.obstacleX);
    }

    updateScene(){
        this.scene.update(this.screenCoordinates, this.scale, this.sceneX);
    }

    /* ------------------------Below Functions to check collsion----------------------------- */
    checkCoinCollision(player){
        if(this.coin != null){
            let coinX = this.coin.getXPos();
            let coinW = this.coin.getWidth();
            if( (coinX + coinW) > player.getXPos() && coinX < player.getXPos()){
                if(this.coin.getYPos() > player.getYPos()){
                    return true;
                }
            }
            else{
                return false;
            }
        }
    }

    // checkObstacleCollision(player){
    //     if(this.obstacle != null){
    //         let obstacleX = this.obstacle.getXPos();
    //         let obstacleW = this.obstacle.getWidth();
    //         if((obstacleX  - obstacleW) < player.getXPos()){
                
    //             if((this.obstacle.getYPos()) >= player.getYPos()){
    //                 return true;
    //             }
    //         }
    //         else{
    //             return false;
    //         }
    //     }
    // }
}   