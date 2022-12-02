$(document).ready(function () {
    preload();
    //Check if cookie exists
    var checked = checkCookie("cookie 1 left");

    if (checked == 0) {
        getpapercontent();
    }
    
});

// Strixhaven Star
function getpapercontent() {
    const { createClient } = supabase;

    var anon = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkY2Nhem1uemlwcGJsbnZ2cWRwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2NzczNDkyOCwiZXhwIjoxOTgzMzEwOTI4fQ.79swd9Gvw45ziqMzXrIxPSnQU67K6swiVnSJAzujLqA';
    var url = 'https://pdccazmnzippblnvvqdp.supabase.co';
    const _supabase = createClient(url, anon);

    _supabase.from('_tblStrixhavenStar').select('*').then(response => {
        arytostr(response.data);
    })
}

function arytostr(array) {
    for (var x = 0; x < array.length; x++) {
        var page = array[x]['page'];
        var loc = array[x]['loc'];
        var title = array[x]['title'];
        var author = array[x]['author'];
        var content = array[x]['content'];
        var img = array[x]['img'];
        var cname = "cookie " + page + " " + loc;
        var string = page + " : " + loc + " : " + title + " : " + author + " : " + content + " : " + img;
        cookify(cname, string);
    }
}

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
