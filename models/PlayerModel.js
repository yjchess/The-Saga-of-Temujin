class Player extends Playable{
    constructor(level){
        super();
        switch (level) {
            case 1:
                this.units =[
                    new Unit("player", VILLAGER, [20,22]),
                    new Unit("player", CAVALRY, [18,22]),
                ]

                this.buildings =[
                    new Building(STABLES, [22,22]),
                ]
                break;
        
            default:
                break;
        }
    }

    // resetMovement(){
    //     this.units.forEach((unit)=>{
    //         unit.moved=false;
    //     });
    // }


    
    // getUnits(){
    //     return this.units;
    // }

    // getBuildings(){
    //     return this.buildings;
    // }

    // destroyUnit(unit){
    //     let unit_index = this.units.indexOf(unit);
    //     this.units.splice(unit_index,1);
    // }

    // destroyBuilding(building){
    //     let building_index = this.buildings.indexOf(building);
    //     this.buildings.splice(building_index,1);
    // }

    // startTurn(){
    //     this.units.forEach((unit)=>{
    //         unit.moved = false;
    //         unit.attacked = false;
    //     })

    // }

}