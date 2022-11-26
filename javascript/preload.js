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
    console.log(images);

    images[i] = new Image();
    images[i].src = preload.arguments[i];
}
