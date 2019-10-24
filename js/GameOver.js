class GameOver{
    constructor(canvas, context){
        this.canvas = canvas;
        this.context = context;
        // this.image = new Image();
        // this.image.src = 'images/intro1.png';
    }

    draw(){
        if(state.CURRENT == state.OVER){
            this.context.font = "30px Arial";
            this.context.fillText('Game Over',  100,500);
        }
    }
}