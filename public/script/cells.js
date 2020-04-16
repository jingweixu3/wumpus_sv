class cells{
    constructor(world){
        this.world = world;
        this.cellsArray = new Array();
    }

    addingCell(cell){
        this.cellsArray.push(cell);
    }

    display(){
        for(let i = 0; i < this.cellsArray.length; i++){
            this.cellsArray[i].display();
        }
    }
}