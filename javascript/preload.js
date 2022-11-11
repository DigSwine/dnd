$(document).ready(function () {
    preload();
});

// Pre load images 
function preload() {
    var images = [
        "blackmarket.png",
        "MtG_background.jpg",
        "strix_logo.png",
        "strix_map.png"
    ];
    for (var i = 0; i < arguments.length; i++) {
        console.log(images[i]);
        images[i] = '../assets/' + images[i];
        images[i] = new Image();
        images[i].src = preload.arguments[i];
    }
}