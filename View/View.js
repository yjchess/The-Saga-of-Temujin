class View{
    constructor(){
        this.displayGrid();
    }

    displayGrid(){
        let gridContainer = document.querySelector(".gridarea");
        for (let y = 1; y < 26; y++) {
            for (let x = 1; x < 26; x++) {
                gridContainer.innerHTML += `<div class ="square x${x} y${y}"><div class = "square_overlay"></div></div>`
            }   
        }
    }

    displayMapFeatures(map){
        map.aestheticFeatures.forEach((feature)=>{
            for (let x = feature[0][0]; x <= feature[1][0]; x++){
                for (let y = feature[0][1]; y <= feature[1][1]; y++){
                    let square = convertCoordToHTMLElement([x,y]);
                    square.classList.add(feature[2]);
                }
            }
        });

        map.impassableFeatures.forEach((feature)=>{
            for (let x = feature[0][0]; x <= feature[1][0]; x++){
                for (let y = feature[0][1]; y <= feature[1][1]; y++){
                    let square = convertCoordToHTMLElement([x,y]);
                    square.classList.add(feature[2]);
                }
            }
        });

        map.buildableFeatures.forEach((feature)=>{
            for (let x = feature[0][0]; x <= feature[1][0]; x++){
                for (let y = feature[0][1]; y <= feature[1][1]; y++){
                    let square = convertCoordToHTMLElement([x,y]);
                    square.classList.add(feature[2]);
                }
            }
        });
    }

    displayUnits(units){
        units.forEach((unit)=>{
            convertCoordToHTMLElement(unit.coord).childNodes[0].classList.add(unit.owner);
            convertCoordToHTMLElement(unit.coord).childNodes[0].classList.add(unit.name);
        });
    }

    displayBuildings(buildings){
        buildings.forEach((building)=>{
            let location = convertCoordToHTMLElement(building.coord).childNodes[0];

            location.classList.add("building");
            location.classList.add(building.owner);
            location.classList.add(building.name);
            
        });
    }


}