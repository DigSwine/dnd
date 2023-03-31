$(document).ready(function () {
    preload();
    //Check if cookie exists
    var checked = checkCookie("cookie 1 left");

    if (checked == 0) {
        getpapercontent();
    }
    
});

//// Pre load images 
function preload() {
    
//    var images = [];

//    /* all pages */
//    images.push("strix_logo.png");

//    /* Landing Images */
//    // images.push("landing2.mp4");

//    /* About Images */
//    images.push("MtG_background.jpg");

//    /* Logos */
//    images.push("bibloplex.png");
//    images.push("lorehold.png");
//    images.push("prismari.png");
//    images.push("quandrix.png");
//    images.push("silverquill.png");
//    images.push("witherbloom.png");


//    /* Maps Images */    
//    images.push("attempt.jpg");
//    images.push("central_map.png");
//    images.push("lorehold_map.png");
//    images.push("prismari_map.png");
//    images.push("quandrix_map.png");
//    images.push("silverquill_map.png");
//    images.push("witherbloom_map.png");

//    /* News Images */

//    /* Extra Images */

//    /* Admin Images */

//    /* Login Images */
       

//    for (var i = 0; i < images.length; i++) {
//        //console.log(images[i]);
//        images[i] = '../assets/' + images[i];
//        if (images[i].includes(".png") || images[i].includes(".jpg") || images[i].includes(".webp")) {            
//            images[i] = new Image();
//            images[i].src = preload.arguments[i];
//        } else {
//            if (images[i].includes(".mp4")) {

//            }
//        }
//    }
}
