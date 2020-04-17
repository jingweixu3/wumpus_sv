class Wumpus_world {
    constructor(side_number){
        this.cells_size = side_number * side_number; // number of totoal cells
        this.side_number = side_number;
        this.cell_canvas_size = canvas_size / side_number; // one cell size on the canvas, col_canvas_size = row_canvas_size
        this.hero;
        this.cells;
        this.ghost;
        this.key;
        this.pits;
        this.score = 0;
        this.world_Setup();
    }

    world_Setup(){
        //hero

        //cells
        this.cells = new cells(this);
        for(let y = 0; y < this.side_number; y++){
            for(let x = 0; x < this.side_number; x++){
                this.cells.addingCell(new cell([x,y], this.cell_canvas_size, this));
            }
        }
        this.hero = new hero([0,0], this);
        this.cells.cellsArray[0].displayed = true;
        //ghost
        let ghost_x = Math.floor(Math.random() * this.side_number);
        let ghost_y = Math.floor(Math.random() * this.side_number);
        while(ghost_x === this.hero.pos[0] && ghost_y === this.hero.pos[1]){
            ghost_x = Math.floor(Math.random() * this.side_number);
            ghost_y = Math.floor(Math.random() * this.side_number);
        }
        this.ghost = new ghost([ghost_x, ghost_y], this);


        //key
        let key_x = Math.floor(Math.random() * this.side_number);
        let key_y = Math.floor(Math.random() * this.side_number);
        while((key_x === this.hero.pos[0] && key_y === this.hero.pos[1]) || (key_x === this.ghost.pos[0] && key_y === this.ghost.pos[1])){
            key_x = Math.floor(Math.random() * this.side_number);
            key_y = Math.floor(Math.random() * this.side_number);
        }
        this.key = new gold_key([key_x, key_y], this);


        //pits
        this.pits = new pits(this);
        let pits_number = Math.floor(0.1 * this.cells_size);
        let mySet = new Set();
        while(mySet.size < pits_number){
            let x = Math.floor(Math.random() * this.side_number);
            let y = Math.floor(Math.random() * this.side_number);
            let position = [];
            position.push(x);
            position.push(y);
            if(!mySet.has(position) && position[0] !== this.hero.pos[0] && position[1]!== this.hero.pos[1] && position[0]!== this.key.pos[0] && position[1]!== this.key.pos[1]){
                mySet.add(position);
                this.pits.addingPit(new pit(position, this));
                this.cells.cellsArray[y*this.side_number + x].status = CELLSTATUS.PIT;
            }
        }
        console.log("finish setting up");
    }


    initialize_cell_status(){
        let xpos = [-1,1,0,0];
        let ypos = [0,0,1,-1];

        // update cell around ghost
        for (let i = 0; i < xpos.length; i++){
            let cell_xpos = this.ghost.pos[0] + xpos[i];
            let cell_ypos = this.ghost.pos[1] + ypos[i];
            if(cell_xpos >=0 && cell_xpos < this.side_number && 
                cell_ypos >=0 && cell_ypos < this.side_number  && 
                this.cells.cellsArray[cell_ypos * this.side_number + cell_xpos].status === CELLSTATUS.CLEAR){
                    this.cells.cellsArray[cell_ypos * this.side_number + cell_xpos].status = CELLSTATUS.GHOST;
                }
        }


        // update cell around pit
        for (let pit of this.pits.pitsArray){
            for (let i = 0; i < xpos.length; i++){
                let cell_xpos = pit.pos[0] + xpos[i];
                let cell_ypos = pit.pos[1] + ypos[i];

                if(cell_xpos >=0 && cell_xpos < this.side_number && 
                    cell_ypos >=0 && cell_ypos < this.side_number){
                        if(this.cells.cellsArray[cell_ypos * this.side_number + cell_xpos].status === CELLSTATUS.GHOST){
                            this.cells.cellsArray[cell_ypos * this.side_number + cell_xpos].status = CELLSTATUS.BOTH;
                        }
                        else if(this.cells.cellsArray[cell_ypos * this.side_number + cell_xpos].status === CELLSTATUS.CLEAR){
                            this.cells.cellsArray[cell_ypos * this.side_number + cell_xpos].status = CELLSTATUS.GROUND_PIT;
                        }
                        
                    }
            }
        }
    }

    display(){
        this.cells.display();
        this.hero.display();
        this.ghost.display();
        this.key.display();
    }
    gameOver(){

    }
}

