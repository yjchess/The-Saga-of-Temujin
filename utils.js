function convertCoordToHTMLElement(coord){
    let html = document.querySelector(`.x${coord[0]}.y${coord[1]}`);
    return html;
}