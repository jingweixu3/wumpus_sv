class ghost{
    constructor(pos, wolrd){
        this.world = wolrd;
        this.pos = pos;
        this.displayed = false;
        this.killed = false; 
    }
    display(){
        console.log("dis ghos");
        if (this.displayed && !this.killed) {
            image(ghostImg, this.pos[0] * this.world.cell_canvas_size + this.world.cell_canvas_size/4, 
                this.pos[1] * this.world.cell_canvas_size + this.world.cell_canvas_size/4, 
                this.canvas_row_size/2, this.canvas_row_size/2);
        }
    }
}