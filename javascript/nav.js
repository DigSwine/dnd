// https://fontawesome.com/v4/icons/
function swapnav() {
    var current = document.getElementById("navcontroller").classList[1];

    if (current == 'fa-times') {
        //close
        document.getElementById("navcontroller").classList = 'fa fa-bars';
        document.getElementById("navigation").style.width = "36px";

        document.getElementById("homebtn").style.display = 'none';
        document.getElementById("campmap").style.display = 'none';
        document.getElementById("admin").style.display = 'none';
        document.getElementById("extcurr").style.display = 'none';
        document.getElementById("news").style.display = 'none';
    } else {
        //open
        if (current == 'fa-bars') {
            //close
            document.getElementById("navcontroller").classList = 'fa fa-times';
            document.getElementById("navigation").style.width = "250px";

            document.getElementById("homebtn").style.display = 'block';
            document.getElementById("campmap").style.display = 'block';
            document.getElementById("admin").style.display = 'block';
            document.getElementById("extcurr").style.display = 'block';
            document.getElementById("news").style.display = 'block';
        }
    }
}