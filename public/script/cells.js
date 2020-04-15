class cells{
    constructor(world){
        this.world = world;
        this.cells = new Array();
    }

    addingCell(cell){
        this.cells.push(cell);
    }

    display(){
        console.log("dis cells");
        for(let i = 0; i < this.cells.length; i++){
            this.cells[i].display();
        }
    }
}