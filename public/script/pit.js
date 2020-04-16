class pit{
    constructor(pos, world){
        this.displayed = true;  //displayed or not displayed
        this.pos = pos;         // position in the matrix
        this.world = world;
    }

    display(){
        strokeWeight(10);
        stroke(30);
        if (this.displayed) {
            image(pitImg, this.pos[0] * this.world.cell_canvas_size, this.pos[1] * this.world.cell_canvas_size, this.world.cell_canvas_size, this.world.cell_canvas_size);
        }
        noFill();
        square(this.pos[0] * this.cell_canvas_size, this.pos[1] * this.cell_canvas_size, this.cell_canvas_size);
    }
}