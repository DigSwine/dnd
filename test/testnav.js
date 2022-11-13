/* var us, ps = '';
$('#User').change(function () {
    us = $('#User').val();
});

$('#Pass').change(function () {
    ps = $('#Pass').val();
});

$('#logsub').click(function () {
    login('btn', us, ps);
})

$('#bmlogo').click(function () {
    login('bm', us, ps);
})
*/

function swapnav() {
    var current = document.getElementById("navcontroller").classList[1];

    if (current == 'fa-times') {
        //close
        document.getElementById("navcontroller").classList = 'fa fa-bars';

        document.getElementById("navcontainer").style.display = 'none';
    } else {
        //open
        if (current == 'fa-bars') {
            //close
            document.getElementById("navcontroller").classList = 'fa fa-times';

            document.getElementById("navcontainer").style.display = 'block';
        }
    }
}

function gopage(goto) {
    var url = '';

    if (goto == 'home') {
        url = 'index.html';
    }
    if (goto == 'maps') {
        url = 'campusmap.html';
    }
    if (goto == 'news') {
        url = 'strixhavenstar.html';
    }
    if (goto == 'activities') {
        url = 'extra.html';
    }
    if (goto == 'admin') {
        url = 'administration.html';
    }

        window.location = url;
}