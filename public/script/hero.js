class hero{
    constructor(pos, world){
        this.facingDirection = DIRECTION.DOWN;
        this.world = world;
        this.status = true;
        this.pos = pos;
        this.shootChance = 1;
    }

    //draw() function
    alive(){
        if(this.status){
        // check ghost
            if(!this.world.ghost.killed && this.pos[0] === this.world.ghost.pos[0] && this.pos[1] === this.world.ghost.pos[1]){
                console.log("dead in ghost");
                this.facingDirection = DIRECTION.DEAD;
                this.status = false;
                this.world.ghost.displayed = true;
            }

        // check pit
            for(let p of this.world.pits.pitsArray){
                if(p.pos[0] === this.pos[0] && p.pos[1] === this.pos[1]){
                    console.log("dead in pit");
                    this.status = false;
                    this.facingDirection = DIRECTION.DEAD;
                    break;
                }
            }
        }

        if(!this.status){
            for (let cell of this.world.cells.cellsArray){
                console.log("displayed!");
                cell.displayed = true;
            }
            this.world.key.displayed = true;
            this.world.ghost.displayed = true;
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
        this.alive();
        this.world.cells.cellsArray[this.pos[1] * this.world.side_number + this.pos[0]].displayed = true;
        if(this.status && !this.world.key.picked && this.pos[0] === this.world.key.pos[0] && this.pos[1] === this.world.key.pos[1]){
            this.world.key.displayed = true;
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
        this.alive();
        this.world.cells.cellsArray[this.pos[1] * this.world.side_number + this.pos[0]].displayed = true;

        if(this.status && !this.world.key.picked && this.pos[0] === this.world.key.pos[0] && this.pos[1] === this.world.key.pos[1]){
            this.world.key.displayed = true;
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
        this.alive();
        this.world.cells.cellsArray[this.pos[1] * this.world.side_number + this.pos[0]].displayed = true;
        if(this.status && !this.world.key.picked && this.pos[0] === this.world.key.pos[0] && this.pos[1] === this.world.key.pos[1]){
            this.world.key.displayed = true;
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
        this.alive();
        this.world.cells.cellsArray[this.pos[1] * this.world.side_number + this.pos[0]].displayed = true;
        if(this.status && !this.world.key.picked && this.pos[0] === this.world.key.pos[0] && this.pos[1] === this.world.key.pos[1]){
            this.world.key.displayed = true;
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
        if(this.status && !this.world.key.picked && this.pos[0] === this.world.key.pos[0] && this.pos[1] === this.world.key.pos[1]){
            this.world.key.picked = true;
            this.world.score += SCORE.GOLD;
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
            case DIRECTION.DEAD:
                img = agentDeadImg;
        }

        image(img, this.pos[0] * this.world.cell_canvas_size, 
            this.pos[1] * this.world.cell_canvas_size, 
            this.world.cell_canvas_size, this.world.cell_canvas_size);

    }

}