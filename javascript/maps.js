function collegedetails(college) {
    var src = '';
    var collegename = '';
    var collegequote = '';
    var map = '';
    var textref = '';
    if (college == 'sq') {
        src = 'silverquill.png';
        collegename = 'Silverquill';
        collegequote = 'Need to find';
        map = 'silverquill_map.png';
        textref = '_silverquill.html';
    }
    if (college == 'pm') {
        src = 'prismari.png';
        collegename = 'Prismari';
        collegequote = 'Need to find';
        map = 'prismari_map.png';
        textref = '_prismari.html';
    }
    if (college == 'lh') {
        src = 'lorehold.png';
        collegename = 'Lorehold';
        collegequote = 'Need to find';
        map = 'lorehold_map.png';
        textref = '_lorehold.html';
    }
    if (college == 'qd') {
        src = 'quandrix.png';
        collegename = 'Quandrix';
        collegequote = 'Need to find';
        map = 'quandrix_map.png';
        textref = '_quandrix.html';
    }
    if (college == 'wb') {
        src = 'witherbloom.png';
        collegename = 'Witherbloom';
        collegequote = 'Need to find';
        map = 'witherbloom_map.png';
        textref = '_witherbloom.html';
    }
    if (college == 'bp') {
        src = 'bibloplex.webp';
        collegename = 'Bibloplex';
        collegequote = 'Need to find';
        map = 'central_map.png';
        textref = '_bibloplex.html';
    }

    var loc = 'assets/maps/';
    var htmlloc = '/views/maps/';

    src = loc + src;
    map = loc + map;
    textref = htmlloc + textref;
    collegequote = '"' + collegequote + '"';

    $("#thecollegelogo").attr("src", src);
    $("#collegetitle").text(collegename);
    $("#collegequote").text(collegequote);
    $("#collegemap").attr('src', map);
    

    $.ajax({
        url: textref,
        type: 'GET',
        success: function (data) {
            $('#collegedescription').html(data);
        }
    });
    
}

function openclosecollege(type) {
    if (type == 'close') {
        document.getElementById('card').style.display = "none";
    }
    if (type == 'open') {
        document.getElementById('card').style.display = "block";
    }
}