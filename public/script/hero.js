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
        if(this.status && this.shootChance === 1){
            let ghost_x = this.pos[0];
            let ghost_y = this.pos[1];

            this.shootChance--;
            if(this.facingDirection === DIRECTION.UP){
                ghost_y--;
            }
            else if (this.facingDirection === DIRECTION.DOWN){
                ghost_y++;
            }
            else if (this.facingDirection === DIRECTION.RIGHT){
                ghost_x++;
            }
            else if (this.facingDirection === DIRECTION.LEFT){
                ghost_x--;
            }

            if(ghost_x === this.world.ghost.pos[0] && ghost_y === this.world.ghost.pos[1]){
                this.world.ghost.killed = true; 
            }
        }
    }

    pickUpGoldKey(){
        console.log("picking");
        if(this.status && !this.world.key.picked && this.pos[0] === this.world.key.pos[0] && this.pos[1] === this.world.key.pos[1]){
            console.log("picked");
            this.world.key.picked = true;
            this.world.score += SCORE.GOLD;
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