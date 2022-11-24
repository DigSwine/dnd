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

// https://fontawesome.com/v4/icons/
function swapnav(type) {
    console.log(type);
    //close
    if (type == 'close') {
        document.getElementById("navigation").style.display = 'none';
    } else {
        //open
        if (type == 'open') {
            document.getElementById("navigation").style.display = 'block';
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