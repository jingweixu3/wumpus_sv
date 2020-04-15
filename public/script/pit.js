class pit{
    constructor(pos, world){
        this.displayed = false;  //displayed or not displayed
        this.pos = pos;         // position in the matrix
        this.world = world;
    }

    display(){
        if (this.displayed) {
            image(pitImg, this.pos[0] * this.world.cell_canvas_size + this.world.cell_canvas_size/4, 
                this.pos[1] * this.world.cell_canvas_size + this.world.cell_canvas_size/4, 
                this.canvas_row_size/2, this.canvas_row_size/2);
        }
    }
}