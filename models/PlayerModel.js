class Player extends Playable{
    constructor(level){
        super();
        switch (level) {
            case 1:
                this.supply = 2;
                this.resources = {food:25, gold:0}
                this.units =[
                    new Unit("player", VILLAGER, [20,22]),
                    new Unit("player", CAVALRY, [18,22]),
                ]

                this.buildings =[
                    new Building("player", STABLES, [22,22]),
                ]
                break;
        
            default:
                break;
        }
    }

}