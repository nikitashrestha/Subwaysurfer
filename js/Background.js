class Background{
    constructor(canvas, context){
        this.canvas = canvas;
        this.context = context;
        this.image = new Image();
        this.image.src = 'images/bg.png';
        this.offset = 104;
    }

    draw(){
        if(state.CURRENT == state.GAME){
            this.context.drawImage(this.image, 0, 0, this.image.width, this.image.height - this.offset);
            this.context.drawImage(this.image, 0 + this.image.width, 0,  this.image.width, this.image.height - this.offset);
        }
    }
}