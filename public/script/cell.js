class cell{
    constructor(pos, cell_canvas_size, world){
        this.world = world
        this.displayed = false;  //displayed or not displayed
        this.status = CELLSTATUS.CLEAR;   // cell real status: empty cell, pit, ghost
        this.pos = pos;         // pos in the matrix
        this.cell_canvas_size = cell_canvas_size;   //cell size on the canvas
    }

    display(){
        strokeWeight(10);
        stroke(30);
        if (this.displayed) {
            let img;
            switch (this.status) {
                case CELLSTATUS.PIT:
                    img = pitImg;
                    break;
                case CELLSTATUS.GROUND_PIT:
                    img = ground_pit_Img;
                    break;
                case CELLSTATUS.GHOST:
                    img = ground_ghost_img;
                    break;
                case CELLSTATUS.BOTH:
                    img = ground_pit_ghost_img;
                    break;
                default:               
                    img = ground_Img;
                    break;
            }

            image(img, this.pos[0] * this.cell_canvas_size, this.pos[1] * this.cell_canvas_size, this.cell_canvas_size, this.cell_canvas_size);
            noFill();
            square(this.pos[0] * this.cell_canvas_size, this.pos[1] * this.cell_canvas_size, this.cell_canvas_size);

        } 
        else {
            fill(100);
            square(this.pos[0] * this.cell_canvas_size, this.pos[1] * this.cell_canvas_size, this.cell_canvas_size);
        }
    }
}