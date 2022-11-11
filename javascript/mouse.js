
//find mouse location, when on the world-map and keep them - for the usemap 
var coor = "";
function mouseloc() {
    // Get the horizontal coordinate
    var x = event.clientX;
    // Get the vertical coordinate   
    var y = event.clientY;
    var area = document.getElementById("body").getBoundingClientRect();
    var thetop = Math.round(area.top);
    var theleft = Math.round(area.left);
    var finaltop = x - theleft;
    var finalleft = y - thetop;
    coor = coor + ", " + finaltop + ", " + finalleft;
    console.log(coor);
}