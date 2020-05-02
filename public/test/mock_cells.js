const cell = require('./mock_cell');

class mock_cells {
    constructor(side_number){
        this.cells_size = side_number * side_number; // number of totoal cells
        this.side_number = side_number;
        this.cellsArray = new Array();
        this.initialize();
    }

    initialize(){
        for(let y = 0; y < this.side_number; y++){
            for (let x = 0; x < this.side_number; x++){
                this.addingCell(new cell([x,y]));
            }
        }

    }
    addingCell(cell){
        this.cellsArray.push(cell);
    }
}
module.exports = mock_cells;