class AI_world{
    constructor(side_number){
        this.ai_game_over = false;
        this.side_number = side_number;
        this.wumpusworld = new Wumpus_world(side_number);
        this.ai_cells;
        this.initialize();
        this.move_direction = DIRECTION.DOWN;
        this.complete_scan = false;
        this.perceived_danger_count = 0;
        this.perceived_cells = new Set();
    }
    initialize(){
        this.wumpusworld.initialize_cell_status();
        this.ai_cells = new Array();
        for(let x = 0; x < this.side_number; x++){
            for(let y = 0; y < this.side_number; y++){
                this.ai_cells.push(new AI_cell([x,y]));
            }
        }
        this.ai_cells[0].status = AICELLSTATUS.VISITED;
    }
    display(){
        this.makeDecision();
        this.wumpusworld.display();
    }
    makeDecision(){
        let next_cell = this.find_unvisited_safe_cell();
        if(next_cell === undefined){
            // go back to origin
        }
        else{
            //
        }

    }

    find_unvisited_safe_cell(){ 
        let curPosX = this.wumpusworld.hero.pos[0];
        let curPosY = this.wumpusworld.hero.pos[1];
        let curCell = this.ai_cells[curPosY * this.side_number + curPosX];
        let nearest_pathInfo = undefined;
        let smallest_step =  Number.MAX_SAFE_INTEGER;
        for(let i = 0; i < this.perceived_cells.length; i++){
            let next_cell = this.perceived_cells[i];
            if(checkSafe(next_cell)){
                let pathInfo = smallestStep(curCell, next_cell);
                if(pathInfo.steps < smallestStep){
                    nearest_pathInfo = next_cell;
                    smallest_step = total_step; 
                }

            }
        }
        return nearest_pathInfo;
    }

    //bfs
    smallestStep(cell1, cell2){
        let pathInfo = {cells:cell2,steps:undefined,path:undefined};
        return pathInfo;
    }

    
    checkSafe(aicell){
        let posX = aicell.pos[0];
        let posY = aicell.pos[1];
        let cellIndex = posY * this.side_number + posX;
        if(this.ai_cells[cellIndex].status === AICELLSTATUS.PERCEIVED_CLEAR){
            return true;
        }
        else if (this.ai_cells[cellIndex].status === AICELLSTATUS.PERCEIVED_DANGER){
            if(this.ai_cells[cellIndex].perceived_danger_count === this.ai_cells[cellIndex].pit_danger ||
               this.ai_cells[cellIndex].perceived_danger_count === this.ai_cells[cellIndex].pit_danger ){
                 return false;
            }
            else{
                return true;
            }
        }
    }
    update_around_cell(){
        let hero_posX = this.wumpusworld.hero.pos[0];
        let hero_posY = this.wumpusworld.hero.pos[1];
        // perceive around cells
        if(this.wumpusworld.cells(this.side_number * hero_posY + hero_posX) === CELLSTATUS.CLEAR){
            let posX = [-1,1,0,0];
            let posY = [0,0,1,-1];
            for(let i = 0; i < posX.length; i++){
                let around_cellX = posX + hero_posX;
                let around_cellY = posY + hero_posY;
                if( around_cellX >=0 && 
                    around_cellX < this.side_number && 
                    around_cellY >=0 && 
                    around_cellY < this.side_number){
                    if(!this.perceived_cells.has(this.ai_cells[around_cellY * this.side_number + around_cellX])){
                        this.perceived_cells.add(this.ai_cells[around_cellY * this.side_number + around_cellX]);
                    }
                    this.ai_cells[around_cellY * this.side_number + around_cellX].status = AICELLSTATUS.PERCEIVED_CLEAR;
                    this.ai_cells[around_cellY * this.side_number + around_cellX].pit_danger = 0;
                    this.ai_cells[around_cellY * this.side_number + around_cellX].ghost_danger = 0;
                }
            }
        }
        //pit
        else if(this.wumpusworld.cells(this.side_number * hero_posY + hero_posX) === CELLSTATUS.PIT){
            let posX = [-1,1,0,0];
            let posY = [0,0,1,-1];
            for(let i = 0; i < posX.length; i++){
                let around_cellX = posX + hero_posX;
                let around_cellY = posY + hero_posY;
                if( around_cellX >=0 && 
                    around_cellX < this.side_number && 
                    around_cellY >=0 && 
                    around_cellY < this.side_number){
                    this.ai_cells[around_cellY * this.side_number + around_cellX].perceived_danger_count++;
                    if(this.ai_cells[around_cellY * this.side_number + around_cellX].status === AICELLSTATUS.UNKNOWN){
                        this.ai_cells[around_cellY * this.side_number + around_cellX].status = AICELLSTATUS.PERCEIVED_DANGER;
                        this.ai_cells[around_cellY * this.side_number + around_cellX].pit_danger++;
                        this.perceived_cells.add(this.ai_cells[around_cellY * this.side_number + around_cellX]);
                    }
                    else if(this.ai_cells[around_cellY * this.side_number + around_cellX].status === AICELLSTATUS.PERCEIVED_DANGER){
                        this.ai_cells[around_cellY * this.side_number + around_cellX].pit_danger++;
                    }
                }
            }
        }

        //ghost
        else if(this.wumpusworld.cells(this.side_number * hero_posY + hero_posX) === CELLSTATUS.GHOST){
            let posX = [-1,1,0,0];
            let posY = [0,0,1,-1];
            for(let i = 0; i < posX.length; i++){
                let around_cellX = posX + hero_posX;
                let around_cellY = posY + hero_posY;
                if( around_cellX >=0 && 
                    around_cellX < this.side_number && 
                    around_cellY >=0 && 
                    around_cellY < this.side_number){
                    this.ai_cells[around_cellY * this.side_number + around_cellX].perceived_danger_count++;
                    if(this.ai_cells[around_cellY * this.side_number + around_cellX].status === AICELLSTATUS.UNKNOWN){
                        this.ai_cells[around_cellY * this.side_number + around_cellX].status = AICELLSTATUS.PERCEIVED_DANGER;
                        this.ai_cells[around_cellY * this.side_number + around_cellX].ghost_danger++;
                        this.perceived_cells.add(this.ai_cells[around_cellY * this.side_number + around_cellX]);

                    }
                    else if(this.ai_cells[around_cellY * this.side_number + around_cellX].status === AICELLSTATUS.PERCEIVED_DANGER){
                        this.ai_cells[around_cellY * this.side_number + around_cellX].ghost_danger++;
                    }
                }
            }
        }

        //both
        else if(this.wumpusworld.cells(this.side_number * hero_posY + hero_posX) === CELLSTATUS.BOTH){
            let posX = [-1,1,0,0];
            let posY = [0,0,1,-1];
            for(let i = 0; i < posX.length; i++){
                let around_cellX = posX + hero_posX;
                let around_cellY = posY + hero_posY;
                if( around_cellX >=0 && 
                    around_cellX < this.side_number && 
                    around_cellY >=0 && 
                    around_cellY < this.side_number){
                    this.ai_cells[around_cellY * this.side_number + around_cellX].perceived_danger_count++;

                    if(this.ai_cells[around_cellY * this.side_number + around_cellX].status === AICELLSTATUS.UNKNOWN){
                        this.ai_cells[around_cellY * this.side_number + around_cellX].status = AICELLSTATUS.PERCEIVED_DANGER;
                        this.ai_cells[around_cellY * this.side_number + around_cellX].pit_danger++;
                        this.ai_cells[around_cellY * this.side_number + around_cellX].ghost_danger++;
                        this.perceived_cells.add(this.ai_cells[around_cellY * this.side_number + around_cellX]);

                    }
                    else if(this.ai_cells[around_cellY * this.side_number + around_cellX].status === AICELLSTATUS.PERCEIVED_DANGER){
                        this.ai_cells[around_cellY * this.side_number + around_cellX].ghost_danger++;
                        this.ai_cells[around_cellY * this.side_number + around_cellX].pit_danger++;
                    }
                }
            }
        }        
    }
    AImove(){
        switch(this.move_direction){
            case DIRECTION.UP:
                this.wumpusworld.hero.turnUp();
                delayTime(0.5);
                break;
            case DIRECTION.RIGHT:
                this.wumpusworld.hero.turnRight();
                delayTime(0.5);
                break;
            case DIRECTION.DOWN:
                this.wumpusworld.hero.turnDown();
                delayTime(0.5);
                break;
            case DIRECTION.LEFT:
                this.wumpusworld.hero.turnLeft();
                delayTime(0.5);
            break;
        }
        this.ai_cells[this.wumpusworld.hero.pos[1] * this.side_number + this.wumpusworld.hero.pos[0]].status = AICELLSTATUS.VISITED;
    }
}