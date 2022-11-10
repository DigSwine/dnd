// https://fontawesome.com/v4/icons/
function swapnav() {
    var current = document.getElementById("navcontroller").classList[1];

    if (current == 'fa-times') {
        //close
        document.getElementById("navcontroller").classList = 'fa fa-bars';
        document.getElementById("navigation").style.width = "36px";

        document.getElementById("campmap").classList = 'fa fa-pie-chart';
        document.getElementById("admin").classList = 'fa fa-users';
        document.getElementById("extcurr").classList = 'fa fa-futbol-o';
        document.getElementById("news").classList = 'fa fa-newspaper-o'

        document.getElementById("campmap").innerText = '';
        document.getElementById("admin").innerText = '';
        document.getElementById("extcurr").innerText = '';
        document.getElementById("news").innerText = '';
    } else {
        //open
        if (current == 'fa-bars') {
            //close
            document.getElementById("navcontroller").classList = 'fa fa-times';
            document.getElementById("navigation").style.width = "250px";

            document.getElementById("campmap").classList = '';
            document.getElementById("admin").classList = '';
            document.getElementById("extcurr").classList = '';
            document.getElementById("news").classList = ''

            document.getElementById("campmap").innerText = 'Campus Maps';
            document.getElementById("admin").innerText = 'Admin';
            document.getElementById("extcurr").innerText = 'Extracurriculars';
            document.getElementById("news").innerText = 'Strixhaven Star';
        }
    }
}