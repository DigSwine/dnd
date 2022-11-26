$(document).ready(function () {
    preload();
});

// Pre load images 
function preload() {
    var images = [];

    /* all pages */
    images.push("strix_logo.png");

    /* Landing Images */
    // images.push("landing.mp4");

    /* About Images */
    images.push("MtG_background.jpg");
    
    /* Maps Images */

    /* News Images */

    /* Extra Images */

    /* Admin Images */

    /* Login Images */
       

    for (var i = 0; i < images.length; i++) {
        images[i] = '../assets/' + images[i];
        if (images[i].includes(".png") || images[i].includes(".jpg") || images[i].includes(".webp")) {            
            images[i] = new Image();
            images[i].src = preload.arguments[i];
        } else {
            if (images[i].includes(".mp4")) {

            }
        }
    }
}
