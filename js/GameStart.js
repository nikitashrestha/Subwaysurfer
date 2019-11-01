class GameStart{
    constructor(canvas, context){
        this.canvas = canvas;
        this.context = context;
        this.image = new Image();
        this.image.src = 'images/intro1.png';
    }

    draw(){
        if(state.CURRENT == state.READY){
            var my_gradient = this.context.createLinearGradient(0, 0, 0, 170);
            my_gradient.addColorStop(0, "#7abee1");
            my_gradient.addColorStop(0.5, "#18b57e");
            this.context.fillStyle = my_gradient;
            this.context.fillRect(0, 0, WIDTH, HEIGHT);
            this.context.drawImage(this.image,0 , 0, this.canvas.width, this.canvas.height);
        }
    }
}