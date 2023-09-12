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

function updateElement(selector, content) {
    document.querySelector(selector).innerHTML = content;
}

function getProperties(unit){
    let properties = {
        owner: unit.owner,
        name: unit.name,
        health: unit.health,
        movement: unit.movement,
        range: unit.range,
        damage: unit.damage,
    };

    return properties;
}