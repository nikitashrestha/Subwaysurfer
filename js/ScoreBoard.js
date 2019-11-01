class ScoreBoard{
    constructor(context){
        this.context = context;
        this.coinCount = 0;
        this.score = 0;
        this.best = parseInt(localStorage.getItem("best")) || 0;
        this.scoreImg = new Image();
        this.coinImg = new Image();
        this.scoreImg.src = 'images/score.png';
        this.increment = 5;
        this.coinImg.src = 'images/coinl.png';
    }

    draw(){
        if(state.CURRENT == state.GAME){
            this.context.font = "30px Arial";
            this.context.fillText("Best Score",50,50);
            this.context.fillText(this.best, 100, 80);
            this.context.strokeText(this.best, 100, 80);
            this.context.drawImage(this.scoreImg, WIDTH - 300, 0, 100, this.scoreImg.height - 15);
            this.context.fillText(this.score, WIDTH - 260, this.scoreImg.height + 10);
            this.context.strokeText(this.score, WIDTH - 260, this.scoreImg.height + 10);
            this.context.drawImage(this.coinImg, WIDTH - 100, 0, 50, 50);
            this.context.fillText(this.coinCount, WIDTH - 85, 80);
            this.context.strokeText(this.coinCount, WIDTH - 85, 80);
        }
        else if(state.CURRENT == state.OVER){
            this.context.font = "30px Arial";
            this.context.fillText(this.score, WIDTH/2, 100);
            this.context.strokeText(this.score, WIDTH/2, 100);
        }
    }

    updateCoin(){
        this.coinCount++;
    }

    updateScore(object){
        if(object == null){
            this.score++;
        }
        else{
            this.score += this.increment;
        }
        this.best = Math.max(this.score, this.best);
        localStorage.setItem("best", this.best);
    }

    reset(){
        this.score = 0;
        this.coinCount = 0;
    }
}