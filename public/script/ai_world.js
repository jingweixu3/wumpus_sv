class AI_world{
    constructor(side_number){
        this.ai_game_over = false;
        this.side_number = side_number;
        this.wumpusworld;
        this.ai_cells;
        this.move_direction = DIRECTION.DOWN;
        this.complete_scan = false;
        this.initialize();
        this.key = false;
        this.escape = false;
        this.pathInfo = undefined;
    }
    initialize(){
            this.ai_cells = new Array();
            this.wumpusworld = new Wumpus_world(this.side_number);
            this.wumpusworld.initialize_cell_status();    
    
            for(let y = 0; y < this.side_number; y++){
                for(let x = 0; x < this.side_number; x++){
                    this.ai_cells.push(new AI_cell([x,y]));
                }
            }
            this.ai_cells[0].status = AICELLSTATUS.VISITED;
    }
    display(){
        this.wumpusworld.display();
    }

    makeDecision(){
        if(!this.ai_game_over){
            if(this.pathInfo !== undefined){
                if(this.pathInfo.length > 1 && this.key === true){
                    this.wumpusworld.hero.pickUpGoldKey();
                    this.key = undefined;
                }
                if(this.pathInfo.length > 1){
                    this.move(this.pathInfo[0], this.pathInfo[1]);
                    
                    if(this.key === false){
                        this.checkKey();
                    }
                    this.pathInfo.shift();
                    if(this.key === true){
                        this.escape = true;
                        this.pathInfo = undefined;
                    }  
                }
                else{
                    if(this.escape === true){
                        this.wumpusworld.hero.pickUpGoldKey();
                        this.ai_game_over = true;
                    }
                    this.pathInfo = undefined;
                }
            }
            else{
                let curcell = this.ai_cells[this.side_number * this.wumpusworld.hero.pos[1] + this.wumpusworld.hero.pos[0]];
                this.update_around_cell();
                let next_cell = this.find_unvisited_safe_cell(); 
                if(next_cell === undefined || this.key){
                    // go back to origin
                    this.pathInfo = this.smallestStep(curcell, this.ai_cells[0]).path;
                    this.escape = true;
                }
                else{
                    // go to the nearest perceived safe cell
                    this.pathInfo = next_cell.path;
                }
                    // console.log("call: " + this.decisioncall+ " pos" + this.wumpusworld.hero.pos);
            }  
        }           
    }
    checkKey(){
        
        if(this.wumpusworld.hero.pos[0] === this.wumpusworld.key.pos[0] &&
            this.wumpusworld.hero.pos[1] === this.wumpusworld.key.pos[1]){
            console.log("pick");
            this.key = true;
        }
    }
    //bfs
    smallestStep(cell1, cell2){
        // console.log(cell1);
        // console.log(cell2);
        let pathInfo = {cell:cell2, steps:undefined,path:[]};
        let visited_set = new Set();
        let parentsMap = new Map();
        let array = new Array();
        visited_set.add(cell1);
        array.push(cell1);
        // console.log(array);
        while(array.length > 0){
            let cell = array[0];
            if(array[array.length-1] === cell2){
                break;
            }
            array.shift();
            let neighbors = this.getneighbor(cell);
            // console.log(neighbors);
            for (let i = 0; i < neighbors.length; i++){
                // console.log("break");

                if(neighbors[i] === cell2){
                    parentsMap.set(neighbors[i],cell);
                    visited_set.add(neighbors[i]);
                    array.push(neighbors[i]);
                    // console.log("break");
                    break;
                }
                if(neighbors[i].status === AICELLSTATUS.VISITED && !visited_set.has(neighbors[i])){
                    parentsMap.set(neighbors[i],cell);
                    visited_set.add(neighbors[i]);
                    array.push(neighbors[i]);
                }
            }
        }
        // console.log(parentsMap);
        let path = [];
        path.push(cell2);
        if(parentsMap.size>0){
            let cellparent = parentsMap.get(cell2);
            path.unshift(cellparent);
            while(cellparent !== cell1){
                let child = cellparent;
                cellparent = parentsMap.get(child);
                path.unshift(cellparent);
            }
            pathInfo.steps = path.length;
            pathInfo.path = path;
        }
        // console.log(pathInfo);

        return pathInfo;
    }

    getneighbor(cell){
        let posX = [-1,1,0,0];
        let posY = [0,0,1,-1];
        let neighbors = [];
        for(let i = 0; i < posX.length; i++){
            let around_cellX = posX[i] + cell.pos[0];
            let around_cellY = posY[i] + cell.pos[1];
            if( around_cellX >=0 && 
                around_cellX < this.side_number && 
                around_cellY >=0 && 
                around_cellY < this.side_number)
            {
                neighbors.push(this.ai_cells[around_cellY*this.side_number + around_cellX]);
            }
        }
        return neighbors;
    }


    find_unvisited_safe_cell(){ 
        let curPosX = this.wumpusworld.hero.pos[0];
        let curPosY = this.wumpusworld.hero.pos[1];
        let curCell = this.ai_cells[curPosY * this.side_number + curPosX];
        let nearest_pathInfo = undefined;
        let smallest_step =  Number.MAX_SAFE_INTEGER;
        for(let next_cell of this.ai_cells){
            if(this.checkSafe(next_cell)){
                let pathInfo = this.smallestStep(curCell, next_cell);
                if(pathInfo.steps < smallest_step){
                    nearest_pathInfo = pathInfo;
                    smallest_step = pathInfo.steps; 
                }
            }
        }        
        return nearest_pathInfo;
    }
    
    checkSafe(aicell){
        let posX = aicell.pos[0];
        let posY = aicell.pos[1];
        let cellIndex = posY * this.side_number + posX;
        if(this.ai_cells[cellIndex].status === AICELLSTATUS.PERCEIVED_CLEAR){
            return true;
        }
        else if (this.ai_cells[cellIndex].status === AICELLSTATUS.PERCEIVED_DANGER){
            if(this.ai_cells[cellIndex].perceived_danger_count === this.ai_cells[cellIndex].ghost_danger ||
               this.ai_cells[cellIndex].perceived_danger_count === this.ai_cells[cellIndex].pit_danger ){
                 return false;
            }
            else{
                return true;
            }
        }
        else{
            false;
        }
    }
    update_around_cell(){
        let hero_posX = this.wumpusworld.hero.pos[0];
        let hero_posY = this.wumpusworld.hero.pos[1];
        // perceive around cells
        // console.log(this.wumpusworld.hero.pos + this.wumpusworld.cells.cellsArray[this.side_number * hero_posY + hero_posX].status);
        if(this.wumpusworld.cells.cellsArray[this.side_number * hero_posY + hero_posX].status === CELLSTATUS.CLEAR){
            let posX = [-1,1,0,0];
            let posY = [0,0,1,-1];

            for(let i = 0; i < posX.length; i++){
                let around_cellX = posX[i] + hero_posX;
                let around_cellY = posY[i] + hero_posY;
                if( around_cellX >=0 && 
                    around_cellX < this.side_number && 
                    around_cellY >=0 && 
                    around_cellY < this.side_number && 
                    this.ai_cells[around_cellY * this.side_number + around_cellX].status !== AICELLSTATUS.VISITED){
                    // console.log(";;;;");
                    this.ai_cells[around_cellY * this.side_number + around_cellX].status = AICELLSTATUS.PERCEIVED_CLEAR;
                    this.ai_cells[around_cellY * this.side_number + around_cellX].pit_danger = 0;
                    this.ai_cells[around_cellY * this.side_number + around_cellX].ghost_danger = 0;
                }
            }
        }
        //pit
        else if(this.wumpusworld.cells.cellsArray[this.side_number * hero_posY + hero_posX].status === CELLSTATUS.PIT){
            let posX = [-1,1,0,0];
            let posY = [0,0,1,-1];
            for(let i = 0; i < posX.length; i++){
                let around_cellX = posX[i] + hero_posX;
                let around_cellY = posY[i] + hero_posY;
                if( around_cellX >=0 && 
                    around_cellX < this.side_number && 
                    around_cellY >=0 && 
                    around_cellY < this.side_number){
                    this.ai_cells[around_cellY * this.side_number + around_cellX].perceived_danger_count++;
                    if(this.ai_cells[around_cellY * this.side_number + around_cellX].status === AICELLSTATUS.UNKNOWN){
                        this.ai_cells[around_cellY * this.side_number + around_cellX].status = AICELLSTATUS.PERCEIVED_DANGER;
                        this.ai_cells[around_cellY * this.side_number + around_cellX].pit_danger++;
                    }
                    else if(this.ai_cells[around_cellY * this.side_number + around_cellX].status === AICELLSTATUS.PERCEIVED_DANGER){
                        this.ai_cells[around_cellY * this.side_number + around_cellX].pit_danger++;
                    }
                }
            }
        }

        //ghost
        else if(this.wumpusworld.cells.cellsArray[this.side_number * hero_posY + hero_posX].status === CELLSTATUS.GHOST){
            let posX = [-1,1,0,0];
            let posY = [0,0,1,-1];
            for(let i = 0; i < posX.length; i++){
                let around_cellX = posX[i] + hero_posX;
                let around_cellY = posY[i] + hero_posY;
                if( around_cellX >=0 && 
                    around_cellX < this.side_number && 
                    around_cellY >=0 && 
                    around_cellY < this.side_number){
                    this.ai_cells[around_cellY * this.side_number + around_cellX].perceived_danger_count++;
                    if(this.ai_cells[around_cellY * this.side_number + around_cellX].status === AICELLSTATUS.UNKNOWN){
                        this.ai_cells[around_cellY * this.side_number + around_cellX].status = AICELLSTATUS.PERCEIVED_DANGER;
                        this.ai_cells[around_cellY * this.side_number + around_cellX].ghost_danger++;

                    }
                    else if(this.ai_cells[around_cellY * this.side_number + around_cellX].status === AICELLSTATUS.PERCEIVED_DANGER){
                        this.ai_cells[around_cellY * this.side_number + around_cellX].ghost_danger++;
                    }
                }
            }
        }

        //both
        else if(this.wumpusworld.cells.cellsArray[this.side_number * hero_posY + hero_posX].status === CELLSTATUS.BOTH){
            let posX = [-1,1,0,0];
            let posY = [0,0,1,-1];
            for(let i = 0; i < posX.length; i++){
                let around_cellX = posX[i] + hero_posX;
                let around_cellY = posY[i] + hero_posY;
                if( around_cellX >=0 && 
                    around_cellX < this.side_number && 
                    around_cellY >=0 && 
                    around_cellY < this.side_number){
                    this.ai_cells[around_cellY * this.side_number + around_cellX].perceived_danger_count++;

                    if(this.ai_cells[around_cellY * this.side_number + around_cellX].status === AICELLSTATUS.UNKNOWN){
                        this.ai_cells[around_cellY * this.side_number + around_cellX].status = AICELLSTATUS.PERCEIVED_DANGER;
                        this.ai_cells[around_cellY * this.side_number + around_cellX].pit_danger++;
                        this.ai_cells[around_cellY * this.side_number + around_cellX].ghost_danger++;

                    }
                    else if(this.ai_cells[around_cellY * this.side_number + around_cellX].status === AICELLSTATUS.PERCEIVED_DANGER){
                        this.ai_cells[around_cellY * this.side_number + around_cellX].ghost_danger++;
                        this.ai_cells[around_cellY * this.side_number + around_cellX].pit_danger++;
                    }
                }
            }
        }     
    }

    move(cell1, cell2){
        console.log(cell1.pos + " -->" + cell2.pos);
        if(cell2.pos[0] === cell1.pos[0]){
            if(cell2.pos[1] === cell1.pos[1] + 1){
                this.AImove(DIRECTION.DOWN);
            }
            else if(cell2.pos[1] === cell1.pos[1] - 1){
                this.AImove(DIRECTION.UP);
            }
        }
        else if(cell2.pos[1] === cell1.pos[1]){
            if(cell2.pos[0] === cell1.pos[0] + 1){
                this.AImove(DIRECTION.RIGHT);
            }
            else if(cell2.pos[0] === cell1.pos[0] - 1){
                this.AImove(DIRECTION.LEFT);
            }
        }
    }
   
    AImove(direction){
        switch(direction){
            case DIRECTION.UP:
                
                if(this.wumpusworld.hero.pos[1] >0){
                    this.wumpusworld.hero.AIturnUp();
                }
                break;
            case DIRECTION.RIGHT:
                if(this.wumpusworld.hero.pos[0] < this.side_number-1){
                    this.wumpusworld.hero.AIturnRight();
                }
                break;
            case DIRECTION.DOWN:
                if(this.wumpusworld.hero.pos[1] < this.side_number - 1){
                    this.wumpusworld.hero.AIturnDown();
                }
                break;
            case DIRECTION.LEFT:
                if(this.wumpusworld.hero.pos[0] > 0){
                    this.wumpusworld.hero.AIturnLeft();
                }
                break;
        }
        this.ai_cells[this.wumpusworld.hero.pos[1] * this.side_number + this.wumpusworld.hero.pos[0]].status = AICELLSTATUS.VISITED;
    }
}