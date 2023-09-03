// class Map{
//     constructor(level){

//         switch (level) {
//             case 1:
//                 this.features = [
                    
//                     [this.calculateBoxXY([1,1], [25,6]),"dirt"],
//                     [this.calculateBoxXY([2,2], [24,5]),"dark_dirt"],

//                     [this.calculateBoxXY([19,21], [24,24]),"dirt"],
//                     [this.calculateBoxXY([20,22], [23,23]),"dark_dirt"],
                    
//                     [this.calculateBoxXY([1,12], [11,13]),"river"],
//                     [this.calculateBoxXY([14,12], [25,13]),"river"],

//                     [this.calculateBoxXY([12,11], [14,14]),"bridge"],
//                 ]

//                 break;
        
//             default:
//                 break;
//         }
//     }

//     calculateBoxXY(topLeft, bottomRight){
//         if (bottomRight == null){bottomRight = topLeft};
//         let leftX = topLeft[0];
//         let rightX = bottomRight[0];

//         let topY = topLeft[1];
//         let bottomY = bottomRight[1];

//         let coords= [];

//         for (let i = 0; i <= rightX-leftX; i++){
//             for (let j=0; j <= bottomY-topY; j++){
//                 coords.push([leftX+i, topY+j])
//             }
//         }
//         let squareElements =[]

//         coords.forEach((point)=>{
        
//             let htmlSquare = document.querySelector(`.x${point[0]}.y${point[1]}`)
//             squareElements.push(htmlSquare);
//         });

//         return squareElements;

//     }
// }

class Map{
    constructor(level){

        switch (level) {
            case 1:
                this.aestheticFeatures = [
                    //(inclusive) Bottom Left, Top Right, Type
                    [[1,1], [25,6],"dirt"],
                    [[19,21], [24,24],"dirt"],
                    [[12,11], [14,14],"bridge"],
                ]

                this.impassableFeatures = [
                    [[1,12], [11,13],"river"],
                    [[14,12], [25,13],"river"],
                ]

                this.buildableFeatures = [
                    [[2,2], [24,5],"dark_dirt"],
                    [[20,22], [23,23],"dark_dirt"],
                ]

                break;
        
            default:
                break;
        }

    }

    convertToArrayOfCoord(feature){

        let coords = [];

        for (let x = feature[0][0]; x <= feature[1][0]; x++){
            for (let y = feature[0][1]; y <= feature[1][1]; y++){
                array.push[x,y]
            }
        }

        return coords;
    }

    convertToArrayOfHTML(feature){

        let arrayOfHtml = [];

        for (let x = feature[0][0]; x <= feature[1][0]; x++){
            for (let y = feature[0][1]; y <= feature[1][1]; y++){
                let element = document.querySelector(`.x${x}.y${y}`);
                arrayOfHtml.push(element);
            }
        }

        return [arrayOfHtml, feature[2]];
    }

    checkPassableTerrain([x,y]){
        this.impassableFeatures.forEach((feature)=>{
            if(x >= feature[0][0] && x <= feature[1][0]){
                if (y >= feature[0][1] && y <= feature[1][1]){
                    return false
                }
            }
        });

        return true;
    }


        


}