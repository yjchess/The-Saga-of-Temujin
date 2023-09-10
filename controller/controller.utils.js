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