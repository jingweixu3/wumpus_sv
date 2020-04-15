class pits{
    constructor(world){
        this.world = world;
        this.pits = new Array();
    }

    addingPit(pit){
        this.pits.push(pit);
    }

    display(){
        for(let i = 0; i < this.pits.length; i++){
            this.pits[i].display();
        }
    }
}