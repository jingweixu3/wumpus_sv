class hero{
    constructor(pos, world){
        this.facingDirection = DIRECTION.DOWN;
        this.world = world;
        this.status = true;
        this.pos = pos;
        this.shootChance = 1;
    }

    //draw() function
    killed(){
        let cells = this.world.cells;
        let cellPos = this.pos.y * cells.colSize + this.pos.x;
        if(cells[cellPos].status === CELLSTATUS.PIT || cells[cellPos].status === CELLSTATUS.GHOST || cells[cellPos].status === CELLSTATUS.BOTH){
            this.status = false;
            this.world.status +=SCORE.DEAD;
            this.cells[cellPos].displayed = this.cells[cellPos].status;
        }
    }

    update_Cell_Displayed_Status(){
        if(this.status === true){
            let xpos = [0, 0, 1, -1];
            let ypos = [1, -1, 0, 0];
            let curCellPos = this.pos.y * this.world.cells.colSize + this.pos.x;
            let ghostFlag = false;
            let pitFlag = false;
            //check 
            for(let i = 0; i < xpos.length; i++){
                if(this.pos.x + xpos[i] < this.world.cells.colSize && this.pos.x + xpos[i] >=0 &&
                    this.pos.y + ypos[i] < this.world.cells.rowSize && this.pos.y + ypos[i] >=0){
                    let cellPos = (this.pos.y + ypos[i]) * this.world.cells.colSize + this.pos.x + xpos[i];
                    if(this.cells[cellPos].status === CELLSTATUS.BOTH){
                        this.cells[curCellPos].displayed = this.cells[cellPos].status;
                        break;
                    }
                    else if(this.cells[cellPos].status === CELLSTATUS.GHOST){
                        ghostFlag = true;
                    }
                    else if(this.cells[cellPos].status === CELLSTATUS.PIT){
                        pitFlag = true;
                    }
                }
            }
            if(this.cells[curCellPos].displayed === null){
                if(ghostFlag && pitFlag){
                    this.cells[curCellPos].displayed = CELLSTATUS.BOTH;
                }
                else if (ghostFlag){
                    this.cells[curCellPos].displayed = CELLSTATUS.GHOST;
                }
                else if (pitFlag){
                    this.cells[curCellPos].displayed = CELLSTATUS.PIT;
                }
                else{
                    this.cells[curCellPos].displayed = this.cells[curCellPos].status;
                }
            }
        }
    }

    //keyPressed() function
    turnLeft(){
        this.facingDirection = DIRECTION.LEFT;
        if (this.DIRECTION === DIRECTION.LEFT){
            if(this.status === true && this.pos[0] > 0){
                this.pos[0]--;
                this.world.score += SCORE.STEP;
            }
        }
        else{
            this.DIRECTION = DIRECTION.LEFT;
        }
    }

    turnRight(){
        this.facingDirection = DIRECTION.RIGHT;
        if(this.DIRECTION === DIRECTION.RIGHT){
            if(this.status === true && this.pos[0] < this.world.side_number - 1){
                this.pos[0]++;
                this.world.score += SCORE.STEP;
            }
        }
        else{
            this.DIRECTION = DIRECTION.RIGHT;
        }

    }
    
    turnUp(){
        this.facingDirection = DIRECTION.UP;
        if(this.DIRECTION === DIRECTION.UP){

            if(this.status === true && this.pos[1] > 0){
                this.pos[1]--;
                this.world.score += SCORE.STEP;
            }
        }
        else{
            this.DIRECTION = DIRECTION.UP;
        }
    }

    turnDown(){
        this.facingDirection = DIRECTION.DOWN;
        if(this.DIRECTION === DIRECTION.DOWN){
            if(this.status === true && this.pos[1] < this.world.side_number - 1){
                this.pos[1]++;
                this.world.score += SCORE.STEP;
            }
        }
        else{
            this.DIRECTION = DIRECTION.DOWN;
        }
    }

    shoot(){
        let cellPos;
        let cellPrevStatus;
        if(this.shootChance > 0 && this.status === true && this.facingDirection === DIRECTION.UP){
            if(this.pos.y - 1 >= 0){
                cellPos = (this.pos.y - 1) * this.world.cells.colSize + this.pos.x;
                cellPrevStatus = this.world.cells[cellPos].status;
                if(this.world.cells[cellPos].status === CELLSTATUS.GHOST){
                    this.world.cells[cellPos].status = CELLSTATUS.CLEAR;
                }
                else if(this.world.cells[cellPos].status === CELLSTATUS.BOTH){
                    this.world.cells[cellPos].status = CELLSTATUS.PIT;
                }
            }
        }
        else if(this.shootChance > 0 && this.status === true && this.facingDirection === DIRECTION.DOWN){
            if(this.pos.y + 1 < this.cells.rowSize ){
                cellPos = (this.pos.y + 1) * this.world.cells.colSize + this.pos.x;
                cellPrevStatus = this.world.cells[cellPos].status;
                if(this.world.cells[cellPos].status === CELLSTATUS.GHOST){
                    this.world.cells[cellPos].status = CELLSTATUS.CLEAR;
                }
                else if(this.world.cells[cellPos].status === CELLSTATUS.BOTH){
                    this.world.cells[cellPos].status = CELLSTATUS.PIT;
                }
            }
        }
        else if(this.shootChance > 0 && this.status === true && this.facingDirection === DIRECTION.RIGHT){
            if(this.pos.x + 1 < this.cells.colSize ){
                cellPos = this.pos.y * this.world.cells.colSize + this.pos.x + 1;
                cellPrevStatus = this.world.cells[cellPos].status;
                if(this.world.cells[cellPos].status === CELLSTATUS.GHOST){
                    this.world.cells[cellPos].status = CELLSTATUS.CLEAR;
                }
                else if(this.world.cells[cellPos].status === CELLSTATUS.BOTH){
                    this.world.cells[cellPos].status = CELLSTATUS.PIT
                }
            }
        }
        else if(this.shootChance > 0 && this.status === true && this.facingDirection === DIRECTION.LEFT){
            if(this.pos.x - 1 >= 0){
                cellPos = this.pos.y * this.world.cells.colSize + this.pos.x - 1;
                cellPrevStatus = this.world.cells[cellPos].status;
                if(this.world.cells[cellPos].status === CELLSTATUS.GHOST){
                    this.world.cells[cellPos].status = CELLSTATUS.CLEAR;
                }
                else if(this.world.cells[cellPos].status === CELLSTATUS.BOTH){
                    this.world.cells[cellPos].status = CELLSTATUS.PIT
                }
            }
        }
        this.shootChance--;
    // update displayed cell around this cell if successfully shoot ghost
        let xpos = [0, 0, 1, -1];
        let ypos = [1, -1, 0, 0];

        if(cellPrevStatus === CELLSTATUS.GHOST){
            for(let i = 0; i < xpos.length; i++){
                if(this.pos.x + xpos[i] < this.world.cells.colSize && this.pos.x + xpos[i] >=0 &&
                    this.pos.y + ypos[i] < this.world.cells.rowSize && this.pos.y + ypos[i] >=0){
                    let aroundCellPos = (this.pos.y + ypos[i]) * this.world.cells.colSize + this.pos.x + xpos[i];
                        this.world.cells[aroundCellPos].displayed = CELLSTATUS.CLEAR;
                }
            }
        }
        else if (cellPrevStatus === CELLSTATUS.BOTH){
            for(let i = 0; i < xpos.length; i++){
                if(this.pos.x + xpos[i] < this.world.cells.colSize && this.pos.x + xpos[i] >=0 &&
                    this.pos.y + ypos[i] < this.world.cells.rowSize && this.pos.y + ypos[i] >=0){
                    let aroundCellPos = (this.pos.y + ypos[i]) * this.world.cells.colSize + this.pos.x + xpos[i];
                    this.world.cells[aroundCellPos].displayed = CELLSTATUS.PIT;
                }
            }
        }

    }

    pickUpGoldKey(){
        if(this.status === true && this.world.key.pos.x === this.pos.x && 
            this.world.key.pos.y === this.pos.y && 
            this.world.key.picked === false && 
            this.world.key.displayed === true){

            this.world.score += SCORE.GOLD;  
            this.world.key.picked = true;
            this.world.key.displayed = false;
        }
    }


    //display agent
    display(){
        let img;
        switch (this.facingDirection) {
            case DIRECTION.RIGHT:
                img = agentRightImg;
                break;
            case DIRECTION.DOWN:
                img = agentDownImg;
                break;
            case DIRECTION.LEFT:
                img = agentLeftImg;
                break;
            case DIRECTION.UP:
                img = agentUpImg;
                break;
        }
        if (this.status) {
            image(img, this.pos[0] * this.world.cell_canvas_size, 
                this.pos[1] * this.world.cell_canvas_size, 
                this.world.cell_canvas_size, this.world.cell_canvas_size);
        }
    }

}