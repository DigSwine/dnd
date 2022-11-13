function collegedetails(college) {
    var src = '';
    var collegename = '';
    var collegequote = '';
    var map = '';
    var textref = '';
    var collegedescription = '';
    if (college == 'sq') {
        src = 'silverquill.png';
        collegename = 'Silverquill';
        collegequote = 'Sharp style, sharper wit.';
        collegedescription = '';
        map = 'silverquill_map.png';
        textref = '_silverquill.html';
    }
    if (college == 'pm') {
        src = 'prismari.png';
        collegename = 'Prismari';
        collegequote = 'Express yourself, with the elements!';
        collegedescription = '';
        map = 'prismari_map.png';
        textref = '_prismari.html';
    }
    if (college == 'lh') {
        src = 'lorehold.png';
        collegename = 'Lorehold';
        collegequote = 'Leave no stone unturned!';
        collegedescription = '';
        map = 'lorehold_map.png';
        textref = '_lorehold.html';
    }
    if (college == 'qd') {
        src = 'quandrix.png';
        collegename = 'Quandrix';
        collegequote = 'Math is magic.';
        collegedescription = '';
        map = 'quandrix_map.png';
        textref = '_quandrix.html';
    }
    if (college == 'wb') {
        src = 'witherbloom.png';
        collegename = 'Witherbloom';
        collegequote = 'Get your hands dirty.';
        collegedescription = '';
        map = 'witherbloom_map.png';
        textref = '_witherbloom.html';
    }
    if (college == 'bp') {
        src = 'bibloplex.png';
        collegename = 'Central Campus';
        collegequote = 'Infinite Knowledge is Infinite Power';
        collegedescription = 'The central campus is the heart of Strixhaven University. Its extensive grounds include residence halls for first-year students, dining halls, administration buildings, classrooms and laboratories and space for social gatherings.';
        map = 'central_map.png';
        textref = '_centralcampus.html';
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
    $("#collegedet").text(collegedescription);
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