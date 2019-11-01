class GameOver{
    constructor(canvas, context){
        this.canvas = canvas;
        this.context = context;
        this.image = new Image();
        this.image.src = 'images/gameOver.png';
    }

    draw(){
        if(state.CURRENT == state.OVER){
            this.context.drawImage(this.image, WIDTH/2 -200, 0, this.image.width, HEIGHT);
        }
    }
}