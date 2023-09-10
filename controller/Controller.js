
class Controller{
    constructor(){
        this.view = new View();
        this.map = new Map(1);
        this.player = new Player(1);
        this.computer = new Computer(1);
        this.finishTurn = document.querySelector(".finishRound");

        this.events=[];
        this.takenSpots = [];

        this.startGame();
    }

    displayAll(){
        this.view.displayMapFeatures(this.map);
        this.view.displayUnits(this.player.units);
        this.view.displayBuildings(this.player.buildings);
        this.view.displayUnits(this.computer.units);
        this.view.displayBuildings(this.computer.buildings);
    }

    startGame(){
        this.displayAll();
        this.assignClickEvents();
        this.finishTurn.addEventListener("click", ()=>{this.endPlayerTurn()})

    }

    endPlayerTurn(){

        this.player.units.forEach((unit)=>{unit.resetMovement();})

        this.computer.computerTurn();
    }

    assignClickEvents(){
        this.player.units.forEach((unit)=>{
            let location = convertCoordToHTMLElement(unit.coord);
            let unitMovementEvent = ()=>this.displayMovementPossibilities(unit);
            this.events.push([location, unitMovementEvent]);
    
            location.addEventListener("click", unitMovementEvent);
        })

    }

    displayUnitMovement(unit, move){
        this.view.eraseUnit(unit, "player");
        unit.move(move);

        removeActionOverlay("movable");
        removeActionOverlay("attackable");

        this.view.drawUnit(unit, "player");
        this.refreshEvents();

    }

    displayMovementPossibilities(unit){

        if(document.querySelectorAll(".movable").length !== 0 || document.querySelectorAll(".attackable").length !== 0){
            removeActionOverlay("movable");
            removeActionOverlay("attackable");
            return
        }

        //Step 1: Remove all previous displays of movement possibilities.
        removeActionOverlay("movable");
        removeActionOverlay("attackable");

        this.refreshEvents();

        let movable = unit.calculatePossibleMoves();



        let attackable = unit.calculatePossibleAttacks();
        this.view.displayAttackableSquares(attackable);

        if(movable){
            movable.forEach((move)=>{

                let movement = convertToHtml(move);
                let unitMovementEvent = ()=>this.displayUnitMovement(unit, move);

                this.events.push([movement, unitMovementEvent]);
                movement.addEventListener("click", unitMovementEvent);
            });
            this.view.displayMovableSquares(movable);
        }

    }

    refreshEvents(){
        this.events.forEach((event)=>{
            event[0].removeEventListener("click", event[1]);
        });
        this.assignClickEvents();
    }

    calculateBuildableSpots(){
        let buildable = [];

        this.map.features.forEach((feature)=>{
            if (feature[1] === "dark_dirt"){
                buildable.push(feature);
            }
        })

        return buildable;
    }

    checkMovable(spot){
        this.updateTakenSpots();
        let condition_one = this.map.checkPassableTerrain(spot);
        let condition_two = !(this.takenSpotIncludes(spot));
        if (condition_one && condition_two){
            return true;
        }
        else{
            return false;
        }
    }

    takenSpotIncludes(spot){
        let conditionResult = false;
        this.takenSpots.forEach((taken)=>{

            if(taken.toString() === spot.toString()){
                conditionResult = true;
            }

        })
        return conditionResult;
    }

    updateTakenSpots(){

        this.takenSpots = [];

        this.player.units.forEach((unit)=>{
            this.takenSpots.push(unit.coord);
        })

        this.computer.units.forEach((unit)=>{
            this.takenSpots.push(unit.coord);
        })

        this.player.buildings.forEach((building)=>{
            building.coords.forEach((coord)=>{
                this.takenSpots.push(coord);
            })
        })

        this.computer.buildings.forEach((building)=>{
            building.coords.forEach((coord)=>{
                this.takenSpots.push(coord);
            })
        })

        return this.takenSpots;
    }

    


}

let controller = new Controller();