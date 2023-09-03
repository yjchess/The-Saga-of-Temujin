class View{
    constructor(){

    }

    createGridSquares(){
        let squares = 25 //x by x sized board
        let grid = document.getElementById('grid');
        placeSquares(grid, squares);
    }


    drawMapFeature([featureHtmlArray, type]){
        featureHtmlArray.forEach((feature)=>{feature.classList.add(type);});
    }

    drawUnits(units, player){
        units.forEach((unit)=>{this.drawUnit(unit, player)});
    }

    drawUnit(unit, player){
        unit.location.childNodes[0].classList.add(unit.name);
        unit.location.childNodes[0].classList.add(player);
    }

    eraseUnit(unit, player){
        unit.location.childNodes[0].classList.remove(unit.name);
        unit.location.childNodes[0].classList.remove(player);
    }

    drawBuilding(building, player){
        building[0].childNodes[0].classList.add(building[1]);
        building[0].childNodes[0].classList.add(player);
        building[0].childNodes[0].classList.add("building");

    }

    displayAll(mapFeatures, player, computer){
        // this.drawMap(mapFeatures);

        this.drawUnits(player.units, "player");
        this.drawBuildings(player.buildings, "player");

        this.drawUnits(computer.units, "computer");
        this.drawBuildings(computer.buildings, "computer");
    }

    displayMovableSquares(movable){
        console.log(movable);
        movable.forEach((square)=>{
            document.querySelector(`.x${square[0]}.y${square[1]}`).childNodes[0].classList.add("movable")
        });
    }

    displayAttackableSquares(attackable){
        attackable.forEach((square)=>{
            square.childNodes[0].classList.add("attackable");
        })
    }

}