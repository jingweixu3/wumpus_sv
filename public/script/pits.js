class pits{
    constructor(world){
        this.world = world;
        this.pitsArray = new Array();
    }

    addingPit(pit){
        this.pitsArray.push(pit);
    }

    display(){
        for(let i = 0; i < this.pitsArray.length; i++){
            this.pitsArray[i].display();
        }
    }
}