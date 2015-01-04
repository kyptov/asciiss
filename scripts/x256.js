
function map(hex) {
        var r = parseInt(hex.slice(0,2), 16);
        var g = parseInt(hex.slice(2,4), 16);
        var b = parseInt(hex.slice(4,6), 16);
        return [ r, g, b ];
}

function x256(r, g, b) 
{
    var c = [ r, g, b ];
    var best = null;
    
    for (var i = 0; i < ansicolors.length; i++) {
        var d = distance(map(ansicolors[i]), c)
        if (!best || d <= best.distance) {
            best = { distance : d, index : i };
        }
    }
    
    return best.index;
}

function distance (a, b) {
    return Math.sqrt(
        Math.pow(a[0]-b[0], 2)
        + Math.pow(a[1]-b[1], 2)
        + Math.pow(a[2]-b[2], 2)
    )
}
