class Playable{
    constructor(){

    }

    getUnits(){
        return this.units;
    }

    getBuildings(){
        return this.buildings;
    }

    destroyUnit(unit){
        let unit_index = this.units.indexOf(unit);
        this.units.splice(unit_index,1);
    }

    buildBuilding(building){
        
    }

    destroyBuilding(building){
        let building_index = this.buildings.indexOf(building);
        this.buildings.splice(building_index,1);
    }

    startTurn(){
        this.units.forEach((unit)=>{
            unit.moved = false;
            unit.attacked = false;
        })

    }
}