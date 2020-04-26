class AI_world{
    constructor(side_number){
        this.ai_game_over = false;
        this.side_number = side_number;
        this.wumpusworld = new Wumpus_world(side_number);
        this.ai_cells;
        this.initialize();
        this.move_up_down = DIRECTION.DOWN;
        this.move_left_right = DIRECTION.RIGHT;
        this.complete_scan = false;
    }
    initialize(){
        this.wumpusworld.initialize_cell_status();
        this.ai_cells = new Array();
        for(let x = 0; x < this.side_number; x++){
            for(let y = 0; y < this.side_number; y++){
                this.ai_cells.push(new AI_cell());
            }
        }
    }
    display(){
        this.move(this.AImove);
        this.wumpusworld.display();
    }
    move(){
        if(this.complete_scan){
            //going back
        }
        else{            
            this.update_around_cost();

        }
    }


    go_bump(){
        let hero_posX = this.wumpusworld.hero.pos[0];
        let hero_posY = this.wumpusworld.hero.pos[1];
        let cell_posX = hero_posX;
        let cell_posY = hero_posY;
        if(this.move_up_down === DIRECTION.UP){
            
            if(this.ai_cells[cell_posY * this.side_number + cell_posX].status === AICELLSTATUS.PERCEIVED_CLEAR){                // move!
                if(cell_posY + 1 >= 0){
                    AImove();
                }
                //hit wall go right
                else{
                    this.move_direction = DIRECTION.RIGHT;
                }
            }
            else if(this.ai_cells[cell_posY * this.side_number + cell_posX].status === AICELLSTATUS.PERCEIVED_DANGER){
                
            }
            
  
        }
    }

    update_around_cost(){
        let hero_posX = this.wumpusworld.hero.pos[0];
        let hero_posY = this.wumpusworld.hero.pos[1];
        // check current pos cost
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
                    this.ai_cells[around_cellY * this.side_number + around_cellX].status = AICELLSTATUS.PERCEIVED_CLEAR;
                    this.ai_cells[around_cellY * this.side_number + around_cellX].pit_danger = 0;
                    this.ai_cells[around_cellY * this.side_number + around_cellX].ghost_danger = 0;
                }
            }
        }
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
                    if(this.ai_cells[around_cellY * this.side_number + around_cellX].status === AICELLSTATUS.UNKNOWN){
                        this.ai_cells[around_cellY * this.side_number + around_cellX].status = AICELLSTATUS.PERCEIVED_DANGER;
                        this.ai_cells[around_cellY * this.side_number + around_cellX].pit_danger++;
                    }
                    else if(this.ai_cells[around_cellY * this.side_number + around_cellX].status !== AICELLSTATUS.PERCEIVED_CLEAR){
                        if(this.ai_cells[around_cellY * this.side_number + around_cellX].pit_danger !==0){
                            this.ai_cells[around_cellY * this.side_number + around_cellX].pit_danger++;
                        }
                    }
                }
            }
        }
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
                    if(this.ai_cells[around_cellY * this.side_number + around_cellX].status === AICELLSTATUS.UNKNOWN){
                        this.ai_cells[around_cellY * this.side_number + around_cellX].status = AICELLSTATUS.PERCEIVED_DANGER;
                        this.ai_cells[around_cellY * this.side_number + around_cellX].ghost_danger++;
                    }
                    else if(this.ai_cells[around_cellY * this.side_number + around_cellX].status !== AICELLSTATUS.PERCEIVED_CLEAR){
                        if(this.ai_cells[around_cellY * this.side_number + around_cellX].ghost_danger !==0){
                            this.ai_cells[around_cellY * this.side_number + around_cellX].ghost_danger++;
                        }
                    }
                }
            }
        }
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
                    if(this.ai_cells[around_cellY * this.side_number + around_cellX].status === AICELLSTATUS.UNKNOWN){
                        this.ai_cells[around_cellY * this.side_number + around_cellX].status = AICELLSTATUS.PERCEIVED_DANGER;
                        this.ai_cells[around_cellY * this.side_number + around_cellX].pit_danger++;
                        this.ai_cells[around_cellY * this.side_number + around_cellX].ghost_danger++;
                    }
                    else if(this.ai_cells[around_cellY * this.side_number + around_cellX].status !== AICELLSTATUS.PERCEIVED_CLEAR){
                        if(this.ai_cells[around_cellY * this.side_number + around_cellX].ghost_danger !==0){
                            this.ai_cells[around_cellY * this.side_number + around_cellX].ghost_danger++;
                        }
                        if(this.ai_cells[around_cellY * this.side_number + around_cellX].pit_danger !==0){
                            this.ai_cells[around_cellY * this.side_number + around_cellX].pit_danger++;
                        }
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
    }
}