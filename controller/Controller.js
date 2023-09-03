
//attempt to rewrite code to be closer to mvc architecture
class Controller{
    constructor(){
        this.level = 0;
        this.player; this.computer; this.map;
        this.view =  new View();
        this.finalLevel = 10;
        this.events = [];
        this.takenSpots = [];
    }

    updateModels(level){
        this.player = new Player(level);
        this.computer = new Computer(level);
        this.map = new Map(level);
    }

    startGame(){
        this.view.createGridSquares();

        this.endTurnButton = document.querySelector(".finishRound");
        let endTurn = () => {
            removeAllOverlays();
            this.refreshEvents();
            // this.player.finishTurn();
            this.computer.computerTurn(); //todo: async await
            this.player.startTurn();
            this.assignClickEvents();
        }
        this.endTurnButton.addEventListener("click",endTurn);

        this.nextLevel();


    }

    nextLevel(){
        if (this.level != this.finalLevel){
            this.level +=1;
            this.updateModels(this.level);
            this.updateMapView();
            this.updateView();
            this.player.startTurn();
            this.assignClickEvents();
            return
        }

        this.view.displayVictoryScreen();
    }

    restartGame(){
        this.level=0;
        this.nextLevel();
    }

    restartLevel(){
        this.level -= 1;
        this.nextLevel();
    }

    updateMapView(){
        this.map.aestheticFeatures.forEach((feature)=>{
            let htmlFeature = this.map.convertToArrayOfHTML(feature);
            this.view.drawMapFeature(htmlFeature);
        });

        this.map.impassableFeatures.forEach((feature)=>{
            let htmlFeature = this.map.convertToArrayOfHTML(feature);
            this.view.drawMapFeature(htmlFeature);
        });

        this.map.buildableFeatures.forEach((feature)=>{
            let htmlFeature = this.map.convertToArrayOfHTML(feature);
            this.view.drawMapFeature(htmlFeature);
        });
    }

    updateView(){
        this.player.units.forEach((unit)=>{
            this.view.drawUnit(unit, "player");
        })

        this.player.buildings.forEach((building)=>{
            this.view.drawBuilding(building.convertTopLeftToHTML(), "player");
        })

        this.computer.units.forEach((unit)=>{
            this.view.drawUnit(unit, "computer");
        })

        this.computer.buildings.forEach((building)=>{
            this.view.drawBuilding(building.convertTopLeftToHTML(), "computer");
        })

        

    }

    assignClickEvents(){
        this.player.units.forEach((unit) => {

            let unitMovementEvent = ()=>this.displayMovementPossibilities(unit);
            this.events.push([unit.location, unitMovementEvent]);

            unit.location.addEventListener("click", unitMovementEvent);
        });
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
                move = convertToHtml(move);
                let unitMovementEvent = ()=>this.displayUnitMovement(unit, move);
                this.events.push([move, unitMovementEvent]);
                move.addEventListener("click", unitMovementEvent);
            });
            this.view.displayMovableSquares(movable);
        }

    }

    displayUnitMovement(unit, move){
        this.view.eraseUnit(unit, "player");
        unit.move(move);

        removeActionOverlay("movable");
        removeActionOverlay("attackable");

        this.view.drawUnit(unit, "player");
        this.refreshEvents();

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

// class World{
//     constructor(worldSize, buildableTerrain, impassableTerrain, playerbuilding, playerBubuilding, computerUnits, computerBuildings){
//         this.worldSize = worldSize;
//         this.buildableTerrain = buildableTerrain;
//         this.impassableTerrain = impassableTerrain;
//         this.playerUnits = playerUnits;
//         this.playerBuildings = playerBuildings;
//         this.computerUnits = computerUnits;
//         this.computerBuildings = computerBuildings;
//     }

//     checkMovable(spot){

//         this.impassableTerrain.forEach((terrain)=>{if(terrain[0] === spot){return false};});
//         this.playerUnits.forEach((unit)=>{if(unit.coord === spot){return false};});

//     }


// }

let controller = new Controller();
controller.startGame();
