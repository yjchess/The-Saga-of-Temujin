const FARM = {name: "farm", health: 75, height: 1, length:1, width: 1};
const YURT = {name: "yurt", health: 75, height: 1, length:1, width: 1};
const STABLES = {name: "stables", health: 75, height: 2, length:2, width: 2, resources: {food: 50, gold:10}};

class Building{
    constructor(owner, base_stats, coord ){
        this.owner = owner;

        this.name   = base_stats.name;
        this.health = base_stats.health;
        this.width = base_stats.width;
        this.height = base_stats.height;
        this.length = base_stats.length;
        this.resources = base_stats.resources;

        //coord is the top left point - the building may be 2x2
        this.coord = coord;
        // this.coords = this.calculateCoords();
    }
}