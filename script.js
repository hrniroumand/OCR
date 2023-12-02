var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d', { willReadFrequently: true });
var image = new Image();
image.src = 'img.png';
canvas.width = 70;
canvas.height = 43;
let pixels = [];
let clusters = [];
let num = 0;
let checkedPoints = new Map();
image.onload = function(){
    context.drawImage(image, 0, 0);
    
    for(let y=0;y<43;y++)
    {
    	for(let x=0;x<70;x++)
    	{
    		// let p = context.getImageData(x, y, 1, 1).data;
    		// $('#report').append(p.join(',')+'<br>');
    		// pixels.push({
            //     x: x,
            //     y: y,
            //     color: rgbToHex(p[0], p[1], p[2])
            // });
            if(checkedPoints.get(x)!=y)
                bf4(x,y,0,0);

    	}
    }
    console.log(clusters);
    clusters.forEach(function (value,index) {
        console.log(value.points)
    })
}

function bf4(x,y,pX,pY)
{
    if(checkedPoints.get(x)==y)
        return false;
    checkedPoints.set(x,y);
    // console.log(x+'--->'+y);
    let p = context.getImageData(x, y, 1, 1).data;
    if(rgbToHex(p[0], p[1], p[2])!='ffffff')
    {
        if(!inCluster(pX,pY))
        {
            if(typeof clusters[y] === 'undefined')
                clusters[y] = {
                    id: y,
                    points: new Map()
                };
            clusters[y].points.set(x,y);
            // console.log(x+'=>>'+y+'=>>'+rgbToHex(p[0], p[1], p[2]));
            
        }
        if(checkedPoints.get(x)!=y)
        {
            bf4(x-1,y,x,y);
            bf4(x+1,y,x,y);
            bf4(x,y-1,x,y);
            bf4(x,y+1,x,y);

        }
    }
    // console.log(clusters.length);
}

function inCluster(x,y) {
    let result = false;
    clusters.forEach(function (item, index){
        if(item.points.get(x)==y)
        {
            result = true;
        }
    });
    return result;

}
function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}


