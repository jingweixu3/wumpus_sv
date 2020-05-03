class AI_cell{
    constructor(pos){
        this.pos = pos;
        this.status = AICELLSTATUS.UNKNOWN;
        this.pit_danger = 0;
        this.ghost_danger = 0;
        this.perceived_danger_count = 0;
    }
}