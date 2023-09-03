// function drawMap(map){
//     map.features.forEach(feature =>{
//         let area = feature[0];
//         let tile = feature[1];
//         draw(area, tile);
//     });

// }

// function drawUnits(units, player){
//     units.forEach(unit => {
//         unit.location.innerHTML = `<div class = 'unit ${unit.name} ${player} square_overlay'></div>`;
//     })
// }

// function drawBuildings(buildings, player){
//     buildings.forEach(building => {
//         building.location.innerHTML = `<div class = 'building ${building.name} ${player} square_overlay'></div>`;
//     })
// }

function removeActionOverlay(type){
    document.querySelectorAll(`.${type}`).forEach(square => {square.classList.remove(`${type}`);});
}

function removeAllOverlays(){
    removeActionOverlay("movable");
    removeActionOverlay("attackable");
}

function convertToHtml([x,y]){
    return document.querySelector(`.x${x}.y${y}`);
}