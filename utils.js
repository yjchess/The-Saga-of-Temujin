function convertCoordToHTMLElement([x,y]){
    let html = document.querySelector(`.x${x}.y${y}`);
    return html;
}