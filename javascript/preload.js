$(document).ready(function () {
    preload();
});

// Pre load images 
function preload() {
    var images = [];

    /* all pages */
    images.push("strix_logo.png");

    /* Landing Images */
    images.push("landing.mp4");

    /* About Images */
    images.push("MtG_background.jpg");
    
    /* Maps Images */

    /* News Images */

    /* Extra Images */

    /* Admin Images */

    /* Login Images */

    

    for (var i = 0; i < images.length; i++) {
        images[i] = '../assets/' + images[i];
        if (images[i].contains(".png") || images[i].contains(".jpg") || images[i].contains(".webp")) {
            console.log(images[i]);
            
            images[i] = new Image();
            images[i].src = preload.arguments[i];
        } else {
            if (images[i].contains(".mp4")) {
                const video = document.createElement("video");
                video.src = preloadVideo(images[x]);
            }
        }
    }
}

function preloadVideo(src) {
    const res = await fetch(src);
    const blob = await res.blob();
    return URL.createObjectURL(blob);
}