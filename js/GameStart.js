class GameStart{
    constructor(canvas, context){
        this.canvas = canvas;
        this.context = context;
        this.image = new Image();
        this.image.src = 'images/intro1.png';
    }

    draw(){
        if(state.CURRENT == state.READY){
            this.context.drawImage(this.image,0 , 0, this.canvas.width, this.canvas.height);
        }
    }
}