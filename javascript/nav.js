var us, ps = '';
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

function swapnav(type) {
    console.log(type);
    //close
    if (type == 'close') {
            document.getElementById('navigation').classList = "hidden_fadeout";
    } else {
        //open
        if (type == 'open') {
            document.getElementById("navigation").style.display = 'block';

            /* Controls */
                document.getElementById('navigation').classList = "showing_fadein";           
        }
    }
}

function gopage(goto) {
    var url = '';
    if (goto == 'about') {
        url = 'about.html';
    }
    if (goto == 'maps') {
        url = 'campusmap.html';
    }
    if (goto == 'libary') {
        url = 'libary.html';
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
    if (goto == 'login') {
        url = 'login.html';
    }

    window.location = url;
}