
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
        removeActionOverlay("movable");
        removeActionOverlay("attackable");

        this.computer.computerTurn();
    }

    assignClickEvents(){
        this.player.units.forEach((unit)=>{
            let location = convertCoordToHTMLElement(unit.coord);
            let unitMovementEvent = ()=>this.displayMovementPossibilities(unit);
            this.events.push([location, unitMovementEvent]);
    
            location.addEventListener("click", unitMovementEvent);
        })


        this.player.units.forEach((unit)=>{
            let location = convertCoordToHTMLElement(unit.coord);
            let unitHoverEvent = ()=>this.displayHoverInfo(unit);
            this.events.push([location, unitHoverEvent]);
    
            location.addEventListener("mouseover", unitHoverEvent);
        })

        this.computer.units.forEach((unit)=>{
            let location = convertCoordToHTMLElement(unit.coord);
            let unitHoverEvent = ()=>this.displayHoverInfo(unit);
            this.events.push([location, unitHoverEvent]);
    
            location.addEventListener("mouseover", unitHoverEvent);
        })

    }

    displayHoverInfo(unit){
        document.querySelector(".imgHover").innerHTML = `<img src = ${unit.name}.png></img>`
        document.querySelector(".ownerHover").innerHTML = `<b>owner: ${unit.owner}</b>`
        document.querySelector(".nameHover").innerHTML = `<b>name: ${unit.name}</b>`
        document.querySelector(".hpHover").innerHTML = `<b>health: ${unit.health}</b>`
        document.querySelector(".movementHover").innerHTML = `<b>movement: ${unit.movement}</b>`
        document.querySelector(".rangeHover").innerHTML = `<b>range: ${unit.range}</b>`
        document.querySelector(".damageHover").innerHTML = `<b>damage: ${unit.damage}</b>`
        document.querySelector(".buildHover").innerHTML = `<b>build: <br>N.A. in hover</b>`
    }

    displaySelectInfo(unit){
        document.querySelector(".imgSelect").innerHTML = `<img src = ${unit.name}.png></img>`
        document.querySelector(".ownerSelect").innerHTML = `<b>owner: ${unit.owner}</b>`
        let name = document.querySelector(".nameSelect").innerHTML = `<b>name: ${unit.name}</b>`
        document.querySelector(".hpSelect").innerHTML = `<b>health: ${unit.health}</b>`
        document.querySelector(".movementSelect").innerHTML = `<b>movement: ${unit.movement}</b>`
        document.querySelector(".rangeSelect").innerHTML = `<b>range: ${unit.range}</b>`
        document.querySelector(".damageSelect").innerHTML = `<b>damage: ${unit.damage}</b>`
        if(name === `<b>name: villager</b>`){
            document.querySelector(".buildSelect").innerHTML = `<b>build: <br> <button class ="yurtButton">Yurt</button> <button class="farmButton">Farm</button></b>`;
            document.querySelector(".yurtButton").addEventListener("click", ()=> unit.calculatePossibleBuilds("yurt"));
            document.querySelector(".farmButton").addEventListener("click", ()=> unit.calculatePossibleBuilds("farm"));

        }
        else{
            document.querySelector(".buildSelect").innerHTML = `<b>build: <br>Can't Build</b>`
        }

        
    }

    displayUnitMovement(unit, move){
        if(convertCoordToHTMLElement(move).classList.contains("movable")){
            this.view.eraseUnit(unit, "player");
            unit.move(move);
    
            removeActionOverlay("movable");
            removeActionOverlay("attackable");
            removeActionOverlay("buildable");
    
            this.view.drawUnit(unit, "player");
            this.refreshEvents();
        }

    }

    displayMovementPossibilities(unit){
        this.displaySelectInfo(unit);
        if(document.querySelectorAll(".movable").length !== 0 || document.querySelectorAll(".attackable").length !== 0 || document.querySelectorAll(".buildable").length !==0){
            removeActionOverlay("movable");
            removeActionOverlay("attackable");
            removeActionOverlay("buildable");
            return
        }

        //Step 1: Remove all previous displays of movement possibilities.
        removeActionOverlay("movable");
        removeActionOverlay("attackable");
        removeActionOverlay("buildable");

        this.refreshEvents();

        let movable = unit.calculatePossibleMoves();
        let attackable = unit.calculatePossibleAttacks();
        let buildable = unit.calculatePossibleBuilds();
        console.log(buildable);


        if(movable){
            movable.forEach((move)=>{

                let movement = convertToHtml(move);
                let unitMovementEvent = ()=>this.displayUnitMovement(unit, move);

                this.events.push([movement, unitMovementEvent]);
                movement.addEventListener("click", unitMovementEvent);
            });
            this.view.displayMovableSquares(movable);
        }

        
        if(buildable){
            buildable.forEach((build)=>{
                let buildment = convertCoordToHTMLElement(build);
                let buildEvent = ()=>unit.build(YURT, build);
                buildment.addEventListener("click", buildEvent );
                buildment.childNodes[0].classList.add("buildable");
                buildment.childNodes[0].classList.remove("movable");
                this.events.push([buildment, buildEvent]);
            })
        }

        if(attackable){
            attackable.forEach((attack)=>{
                console.log(attack);
                let attackment = convertToHtml(attack);
                let unitAttackmentEvent = () => unit.attack(attack);

                this.events.push([attackment, unitAttackmentEvent]);
                attackment.addEventListener("click", unitAttackmentEvent);
            })
            this.view.displayAttackableSquares(attackable);
        }

    }

    refreshEvents(){
        this.events.forEach((event)=>{
            event[0].removeEventListener("click", event[1]);
            event[0].removeEventListener("mouseover", event[1]);
        });
        this.assignClickEvents();
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
            // console.log(convertCoordToHTMLElement(taken));
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
            this.takenSpots.push(building.coord);
        })

        this.computer.buildings.forEach((building)=>{
            this.takenSpots.push(building.coord);
        })

        this.map.impassableFeatures.forEach((feature)=>{

            let rangeX = Math.abs(feature[1][0] - feature[0][0] );
            let rangeY = Math.abs(feature [1][1] - feature[0][1]);
            // console.log(rangeX, rangeY);


            for (let x = feature[0][0]; x <= feature[0][0]+rangeX; x++){

                for (let y = feature[0][1]; y <= feature[0][1]+rangeY; y++){

                    this.takenSpots.push([x,y]);
                    // console.log(x,y);
                }
            }
        });

        // console.log("TAKEN SPOTS =",this.takenSpots);

        return this.takenSpots;
    }

    


}

let controller = new Controller();