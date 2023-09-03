
class Controller{
    constructor(){
        this.view = new View();
        this.map = new Map(1);
        this.player = new Player(1);
        this.computer = new Computer(1);

        this.displayAll();
    }

    displayAll(){
        this.view.displayMapFeatures(this.map);
        this.view.displayUnits(this.player.units);
        this.view.displayBuildings(this.player.buildings);
        this.view.displayUnits(this.computer.units);
        this.view.displayBuildings(this.computer.buildings);
    }


}

let controller = new Controller();