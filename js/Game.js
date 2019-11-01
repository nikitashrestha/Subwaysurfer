class Game{
    constructor(canvas){
        this.canvas = document.getElementById(canvas);
        this.canvas.width = 1024;
        this.canvas.height = 570;
        this.context = this.canvas.getContext('2d');
        this.gameBg = new Background(this.canvas, this.context);
        this.gameStart = new GameStart(this.canvas, this.context);
        this.gameOver = new GameOver(this.canvas, this.context);
        this.scoreBoard = new ScoreBoard(this.context);
        this.railway = new Railway(this.context);
        this.countAnimationFrame = 0;
        this.gameAudio = new Audio();
        this.gameAudio.src = 'sound/game.wav';
        this.startButton = {
            x : WIDTH/2 -200,
            y : 0,
            h : HEIGHT,
            w : 404
        }
        this.start();
        this.detectKeyboardEvent();

    }

    drawCanvas(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.gameBg.draw();
        this.railway.draw();
        this.gameStart.draw();
        this.gameOver.draw();
        this.scoreBoard.draw();
    }

    updateCanvas(){
        this.railway.update(this.countAnimationFrame, this.scoreBoard);
    }

    start(){
        this.canvas.onclick = function(){
            // var that = this;
            switch(state.CURRENT){
                case state.READY:
                    this.gameAudio.loop = true;
                    this.gameAudio.play();
                    state.CURRENT = state.GAME;
                    
                case state.OVER:
                    let rect = this.canvas.getBoundingClientRect();
                    let clickX = event.clientX - rect.left;
                    let clickY = event.clientY - rect.top;
                    // CHECK IF WE CLICK ON THE START BUTTON
                    if(clickX >= this.startButton.x && clickX <= this.startButton.x + this.startButton.w && clickY >= this.startButton.y && clickY <= this.startButton.y + this.startButton.h){
                        this.gameAudio.loop = false;
                    
                        this.railway.reset();
                        this.scoreBoard.reset();
                        state.CURRENT = state.GAME;
                    }
            }
        }.bind(this);
    }

    detectKeyboardEvent(){
        document.addEventListener('keydown', function(event){
            var key = event.key || event.keyCode;
            
            switch(key){
                case 'ArrowLeft':
                    leftKey.CURRENT = leftKey.PRESSED;
                    
                case 'ArrowRight':
                    rightKey.CURRENT = rightKey.PRESSED;

                case 'ArrowUp':
                    upKey.CURRENT = upKey.PRESSED;
            }
        }
        );
    }

    loop(){
        this.countAnimationFrame++;
        this.updateCanvas();
        this.drawCanvas();
        requestAnimationFrame(this.loop.bind(this));
    }
}

game = new Game('game-window');
game.loop();