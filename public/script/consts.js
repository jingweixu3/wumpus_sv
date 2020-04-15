const DIRECTION = {
    UP: 0,
    DOWN: 1,
    RIGHT: 2,
    LEFT: 3
}

const CELL_SIZE = {
    ROW: 8,
    COL: 8
}

//cell status for img and hero use
const CELLSTATUS = {
    CLEAR: 0,
    PIT: 1,
    GHOST: 2,
    BOTH: 3,  //both pit and ghost
}

const SCORE = {
    GOLD: 1000,
    DEAD: -1000,
    STEP: -1
}