class mock_cell{
    constructor(pos){
        this.status = 0;   // cell real status: empty cell, pit, ghost
        this.pos = pos;         // pos in the matrix
    }
}

module.exports = mock_cell;