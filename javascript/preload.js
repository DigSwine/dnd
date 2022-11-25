$(document).ready(function () {
    preload(pageid);
});

// Pre load images 
function preload(page) {
    var images = [];

    if (page == 'index') {
        images = [
            "MtG_background.jpg",
            "strix_logo.png",
            "strix_map.png",
            "collegebackground.jpg",
            "maps/central_map.png",
            "maps/lorehold_map.png",
            "maps/prismari_map.png",
            "maps/quandrix_map.png",
            "maps/silverquill_map.png",
            "maps/witherbloom_map.png"
        ];
    }
    for (var i = 0; i < images.length; i++) {
        console.log(images[i]);
        images[i] = '../assets/' + images[i];
        images[i] = new Image();
        images[i].src = preload.arguments[i];
    }
}