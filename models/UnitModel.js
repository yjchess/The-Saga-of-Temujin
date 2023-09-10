
const VILLAGER = {name:"villager", health:10, range:2, damage:1, movement:1}
const CAVALRY = {name:"cavalry", health:15, range:2, damage:5, movement:3}


class Unit{
    constructor(owner, base_stats, coord, AI_behaviour){
        this.owner = owner,

        this.name = base_stats.name,
        this.health = base_stats.health,
        this.range = base_stats.range,
        this.damage = base_stats.damage,
        this.movement = base_stats.movement,
        this.coord = coord;

        this.movable_events = [];
        this.attackable_events = [];
        this.selectable_events = [];
        
        this.moved = false;
        this.attacked = false;
        this.selected = false;


        this.AI_behaviour = AI_behaviour;
    }

    movementRangeSquares(){
        let movableSquares = [];
        let x_range = calculateBounds(this.coord[0], this.movement);
        let y_range = calculateBounds(this.coord[1], this.movement);

        for (let x = x_range[0]; x <= x_range[1]; x++) {
            for (let y = y_range[0]; y <= y_range[1]; y++) {
                movableSquares.push([x,y]);
            }                
        }
        

        return (movableSquares);
    }

    calculatePossibleMoves(){
        if(this.moved === false){
            let potentialSpots = this.movementRangeSquares();
            let possibleSpots = []
            potentialSpots.forEach((spot)=>{

                if (controller.checkMovable(spot) && !(spot.toString() == this.coord.toString())){
                    possibleSpots.push(spot);
                }
            })
            
            return (possibleSpots);
        }

    }

    calculatePossibleAttacks(){

        let attackableSquares = [];
        if (this.attacked === false){
            let x_range = calculateBounds(this.coord[0], this.range);
            let y_range = calculateBounds(this.coord[1], this.range);

            for (let x = x_range[0]; x <= x_range[1]; x++) {
                for (let y = y_range[0]; y <= y_range[1]; y++) {
                    let potentialSpot = document.querySelector(`.x${x}.y${y}`);
                    if(potentialSpot.classList.contains("computer") || potentialSpot.childNodes[0].classList.contains("computer")){
                        attackableSquares.push(potentialSpot);
                    }
                }                
            }
        }

        return (attackableSquares);

    }

    move(coord){
        this.coord = coord;
        this.moved = true;
    }

    resetMovement(){
        this.moved = false;
    }

    attack(location){
        
    }


    toggleSelection(){
        this.selected = !(this.selected);
    }

    findClosestPath(destination){
        let possibleMoves = this.calculatePossibleMoves();
        console.log(possibleMoves, this);
        if (possibleMoves.includes(destination)){
            this.move(destination);
        }

        else{
            
            let smallestX = 26;
            let smallestY = 26;

            possibleMoves.forEach((move)=>{
                if (move[1] < smallestY){
                    smallestY = move[1];
                }
            })

            possibleMoves.forEach((move)=>{
                if (move[1] === smallestY){
                    if (move[0] < smallestX){
                        smallestX = move[0];
                    }
                }
            })

            this.move(findHtmlSquareElement([smallestX,smallestY]))
        }

    }

    build(building, coord, unitPref){

        let buildingEntity = new Building(this.owner, building, coord)
        controller.view.displayBuilding(buildingEntity);

        if(this.owner === "player"){
            controller.player.buildings.push(new Building ("player", building, coord))
        }

        if(this.owner === "computer"){
            controller.computer.buildings.push(new Building ("computer", building, coord, unitPref))
        }

    }

}