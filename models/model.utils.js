function calculateBounds(centre, range){
    let calculatedBound = [centre - range, centre + range];
    return adjustBounds(calculatedBound);
}

function adjustBounds(adjustableBounds){
    //prevent out of bound errors (grid goes from 1-25 (x and y axis))
    let bounds = adjustableBounds;
    if(bounds[0] < 1){bounds[0] = 1};
    if(bounds[1] > 25){bounds[1] = 25};
    return bounds;
}
