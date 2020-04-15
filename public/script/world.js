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
        this.hero = new hero([0,0], this);

        //cells
        this.cells = new cells(this);
        for(let y = 0; y < this.side_number; y++){
            for(let x = 0; x < this.side_number; x++){
                this.cells.addingCell(new cell(CELLSTATUS.CLEAR, [x,y], this.cell_canvas_size));
            }
        }

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
        while(key_x === this.hero.pos[0] && key_y === this.hero.pos[1] && key_x === this.ghost.pos[0] && key_y === this.ghost.pos[1]){
            key_x = Math.floor(Math.random() * this.side_number);
            key_y = Math.floor(Math.random() * this.side_number);
        }
        this.key = new gold_key([key_x, key_y], this);

        //pits
        this.pits = new pits(this);
        let pits_number = Math.floor(0.2 * this.cells_size);
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
            }
        }
        console.log("finish setting up");
    }

    display(){
        this.cells.display();
        this.pits.display();
        this.key.display();
        this.ghost.display();
        this.hero.display();
    }
}

