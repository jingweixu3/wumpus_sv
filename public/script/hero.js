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
        if(!this.gameover && this.status){
        // check ghost
            if(!this.world.ghost.killed && this.pos[0] === this.world.ghost.pos[0] && this.pos[1] === this.world.ghost.pos[1]){
                this.facingDirection = DIRECTION.DEAD;
                this.world.score-=1000;
                this.status = false;
                this.world.ghost.displayed = true;
            }

        // check pit
            for(let p of this.world.pits.pitsArray){
                if(p.pos[0] === this.pos[0] && p.pos[1] === this.pos[1]){
                    this.world.score-=1000;
                    this.status = false;
                    this.facingDirection = DIRECTION.DEAD;
                    break;
                }
            }
        }

        if(!this.status){
            this.world.gameover = true;
            for (let cell of this.world.cells.cellsArray){
                cell.displayed = true;
            }
            this.world.key.displayed = true;
            this.world.ghost.displayed = true;
            lose_sound.play();
            lose_sound.setVolume(0.1);
        }

    }

    playsound(){
        if(this.world.cells.cellsArray[this.pos[1]*this.world.side_number + this.pos[0]].status === CELLSTATUS.GHOST){
            ghost_sound.play();
            ghost_sound.setVolume(0.1);
            console.log("ghost");
        }
        else if (this.world.cells.cellsArray[this.pos[1]*this.world.side_number + this.pos[0]].status === CELLSTATUS.GROUND_PIT){
            wind_sound.play();
            wind_sound.setVolume(0.2);
            console.log("wind");

        }
        else if (this.world.cells.cellsArray[this.pos[1]*this.world.side_number + this.pos[0]].status === CELLSTATUS.BOTH){
            wind_sound.play();
            ghost_sound.play();
            ghost_sound.setVolume(0.1);
        }
        else{
            wind_sound.stop();
            ghost_sound.stop();
        }

    }


    //keyPressed() function
    turnLeft(){
        if(!this.gameover && this.status){

            if (this.facingDirection === DIRECTION.LEFT){
                if(this.status === true && this.pos[0] > 0){
                    this.pos[0]--;
                    this.world.score += SCORE.STEP;
                    this.playsound();

                }
            }
            else{
                this.facingDirection = DIRECTION.LEFT;
            }

            this.alive();
            this.world.cells.cellsArray[this.pos[1] * this.world.side_number + this.pos[0]].displayed = true;
            if(this.status && !this.world.key.picked && this.pos[0] === this.world.key.pos[0] && this.pos[1] === this.world.key.pos[1]){
                this.world.key.displayed = true;
            }
        }
    }

    turnRight(){
        if(!this.gameover && this.status){
            if(this.facingDirection === DIRECTION.RIGHT){
                if(this.status === true && this.pos[0] < this.world.side_number - 1){
                    this.pos[0]++;
                    this.world.score += SCORE.STEP;
                    this.playsound();

                }
            }
            else{
                this.facingDirection = DIRECTION.RIGHT;
            }

            this.alive();

            this.world.cells.cellsArray[this.pos[1] * this.world.side_number + this.pos[0]].displayed = true;
    
            if(this.status && !this.world.key.picked && this.pos[0] === this.world.key.pos[0] && this.pos[1] === this.world.key.pos[1]){
                this.world.key.displayed = true;
            }
        }
    }
    
    turnUp(){
        if(!this.gameover && this.status){

            if(this.facingDirection === DIRECTION.UP){

                if(this.status === true && this.pos[1] > 0){
                    this.pos[1]--;
                    this.world.score += SCORE.STEP;
                    this.playsound();

                }
            }
            else{
                this.facingDirection = DIRECTION.UP;
            }

            this.alive();
            this.world.cells.cellsArray[this.pos[1] * this.world.side_number + this.pos[0]].displayed = true;
            if(this.status && !this.world.key.picked && this.pos[0] === this.world.key.pos[0] && this.pos[1] === this.world.key.pos[1]){
                this.world.key.displayed = true;
            }
        }

    }

    turnDown(){
        if(!this.gameover && this.status){

            if(this.facingDirection === DIRECTION.DOWN){
                if(this.status === true && this.pos[1] < this.world.side_number - 1){
                    this.pos[1]++;
                    this.world.score += SCORE.STEP;
                    this.playsound();

                }
            }
            else{
                this.facingDirection = DIRECTION.DOWN;
            }
            this.alive();
            this.world.cells.cellsArray[this.pos[1] * this.world.side_number + this.pos[0]].displayed = true;
            if(this.status && !this.world.key.picked && this.pos[0] === this.world.key.pos[0] && this.pos[1] === this.world.key.pos[1]){
                this.world.key.displayed = true;
            }
        }
    }

    shoot(){
        if(!this.gameover && this.status && this.shootChance === 1){
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
                shoot_sound.play();
                this.world.cells.cellsArray[ghost_x + ghost_y * this.world.side_number].displayed = true;
                // update cell around ghost
                let xpos = [-1,1,0,0];
                let ypos = [0,0,1,-1];
                for (let i = 0; i < xpos.length; i++){
                    let cell_xpos = this.world.ghost.pos[0] + xpos[i];
                    let cell_ypos = this.world.ghost.pos[1] + ypos[i];
                    
                    if(cell_xpos >=0 && cell_xpos < this.world.side_number && 
                        cell_ypos >=0 && cell_ypos < this.world.side_number){
                            
                            if(this.world.cells.cellsArray[cell_ypos * this.world.side_number + cell_xpos].status === CELLSTATUS.GHOST){
                                this.world.cells.cellsArray[cell_ypos * this.world.side_number + cell_xpos].status = CELLSTATUS.CLEAR;
                            }
                            else if(this.world.cells.cellsArray[cell_ypos * this.world.side_number + cell_xpos].status === CELLSTATUS.BOTH){
                                this.world.cells.cellsArray[cell_ypos * this.world.side_number + cell_xpos].status = CELLSTATUS.GROUND_PIT;
                            }
                    }
                }
            }
        }
    }

    pickUpGoldKey(){
        let flag = false;
        if(!this.gameover && this.status && !this.world.key.picked && this.pos[0] === this.world.key.pos[0] && this.pos[1] === this.world.key.pos[1]){
            this.world.key.picked = true;
            this.world.score += SCORE.GOLD;
            this.world.key.displayed = false;
            flag = true;
            bell_sound.play();
        }
        if(!this.gameover  && !flag && this.status && this.pos[0] == 0 && this.pos[1] == 0){
            console.log("game over");
            this.status = true;
            this.alive();
            this.world.gameover = true;
            victory_sound.play();
            victory_sound.setVolume(0.1);
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


    
    //AI() function
    AIturnLeft(){
        if(!this.gameover && this.status){
            if(this.status === true && this.pos[0] > 0){
                this.pos[0]--;
                this.world.score += SCORE.STEP;
                // this.playsound();

            }
            

            this.alive();
            this.world.cells.cellsArray[this.pos[1] * this.world.side_number + this.pos[0]].displayed = true;
            if(this.status && !this.world.key.picked && this.pos[0] === this.world.key.pos[0] && this.pos[1] === this.world.key.pos[1]){
                this.world.key.displayed = true;
            }
        }
    }

    AIturnRight(){
        if(!this.gameover && this.status){
            // console.log("turnright");
            if(this.status === true && this.pos[0] < this.world.side_number - 1){
                this.pos[0]++;
                this.world.score += SCORE.STEP;
                // this.playsound();

            }
            this.alive();

            this.world.cells.cellsArray[this.pos[1] * this.world.side_number + this.pos[0]].displayed = true;
    
            if(this.status && !this.world.key.picked && this.pos[0] === this.world.key.pos[0] && this.pos[1] === this.world.key.pos[1]){
                this.world.key.displayed = true;
            }
        }
    }
    
    AIturnUp(){
        if(!this.gameover && this.status){
            if(this.status === true && this.pos[1] > 0){
                this.pos[1]--;
                this.world.score += SCORE.STEP;
                // this.playsound();
            }
            this.alive();
            this.world.cells.cellsArray[this.pos[1] * this.world.side_number + this.pos[0]].displayed = true;
            if(this.status && !this.world.key.picked && this.pos[0] === this.world.key.pos[0] && this.pos[1] === this.world.key.pos[1]){
                this.world.key.displayed = true;
            }
        }

    }

    AIturnDown(){    
        if(!this.gameover && this.status){
            if(this.status === true && this.pos[1] < this.world.side_number - 1){
                this.pos[1]++;
                this.world.score += SCORE.STEP;
                // this.playsound();
            }
            this.alive();
            this.world.cells.cellsArray[this.pos[1] * this.world.side_number + this.pos[0]].displayed = true;
            if(this.status && !this.world.key.picked && this.pos[0] === this.world.key.pos[0] && this.pos[1] === this.world.key.pos[1]){
                this.world.key.displayed = true;
            }
        }
    }

}