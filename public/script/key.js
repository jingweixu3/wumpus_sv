class gold_key{
    constructor(pos, wolrd){
        this.world = wolrd;
        this.pos = pos;
        this.displayed = false;
        this.picked = false; 
    }
    display(){

        console.log("dis key");
        if (this.displayed && !this.picked) {
            image(keyImg, this.pos[0] * this.world.cell_canvas_size + this.world.cell_canvas_size/4, 
                this.pos[1] * this.world.cell_canvas_size + this.world.cell_canvas_size/4, 
                this.canvas_row_size/2, this.canvas_row_size/2);
        }
    }
}