const FARM = {name: "farm", health: 75, height: 1, length:1, width: 1};
const YURT = {name: "yurt", health: 75, height: 1, length:1, width: 1};
const STABLES = {name: "stables", health: 75, height: 2, length:2, width: 2, resources: {food: 50, gold:10}};

class Building{
    constructor(base_stats, topLeft ){

        this.name   = base_stats.name;
        this.health = base_stats.health;
        this.width = base_stats.width;
        this.height = base_stats.height;
        this.length = base_stats.length;
        this.resources = base_stats.resources;

        this.topLeft = topLeft;
        this.coords = this.calculateCoords();
    }

    convertTopLeftToHTML(){
        let html = document.querySelector(`.x${this.topLeft[0]}.y${this.topLeft[1]}`);
        return [html, this.name]
        
    }

    calculateCoords(){
        let coords = [];
        

        for (let x = this.topLeft[0]; x < this.topLeft[0] + this.length; x++) {
            for (let y = this.topLeft[1]; y < this.topLeft[1] + this.height; y++) {

                coords.push([x,y]);
            }
              
        }

        return coords
    }

}