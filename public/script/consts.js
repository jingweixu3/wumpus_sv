const DIRECTION = {
    UP: 0,
    DOWN: 1,
    RIGHT: 2,
    LEFT: 3,
    DEAD: 4
}

const CELL_SIZE = {
    ROW: 8,
    COL: 8
}

//cell status for img and hero use
const CELLSTATUS = {
    CLEAR: 0,
    PIT: 1,   // real pit display
    GHOST: 2, //hint usage
    BOTH: 3, //both pit and ghost ---> hint usage
    GROUND_PIT: 4 //--->hint usage
}

const SCORE = {
    GOLD: 1000,
    DEAD: -1000,
    STEP: -1
}

const AICELLSTATUS = {
    UNKNOWN: 0,
    PERCEIVED_CLEAR: 1,
    PERCEIVED_DANGER: 2,
    VISITED:3
}
