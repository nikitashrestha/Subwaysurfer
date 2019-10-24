class Game{
    constructor(canvas){
        this.canvas = document.getElementById(canvas);
        this.canvas.width = 1024;
        this.canvas.height = 570;
        this.context = this.canvas.getContext('2d');
        this.gameBg = new Background(this.canvas, this.context);
        this.gameStart = new GameStart(this.canvas, this.context);
        this.gameOver = new GameOver(this.canvas, this.context);
        this.railway = new Railway(this.context);
        this.countAnimationFrame = 0;

        this.start();
        this.detectKeyboardEvent();

    }

    drawCanvas(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.gameStart.draw();
        this.gameBg.draw();
        this.railway.draw();
        this.gameOver.draw();
    }

    updateCanvas(){
        this.railway.update(this.countAnimationFrame);
    }

    start(){
        this.canvas.onclick = function(){
            // var that = this;
            switch(state.CURRENT){
                case state.READY:
                    state.CURRENT = state.GAME;
                case state.OVER:
               
                   that.railway.reset();
                   state.CURRENT = state.READY;
            }
        }
    }

    detectKeyboardEvent(){
        window.addEventListener('keydown', function(event){
            var key = event.key || event.keyCode;
            console.log(key);
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