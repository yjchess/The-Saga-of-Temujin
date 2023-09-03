function placeSquares(grid, squares){
    grid.innerHTML +="<div class = squares_container></div>"
    let container = document.querySelector(".squares_container");
    for (let y = 1; y-1 < squares; y++) {
        for (let x = 1; x-1 < squares; x++) {
            container.innerHTML += `<div data-x = ${x} data-y= ${y} class = 'square x${x} y${y}'><div class='square_overlay'></class></div>`;   
        }
    }

}

