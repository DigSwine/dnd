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
        collegedescription = "Right north of the central campus lies a region that looks very much like an extension of it. Silverquill's campus is the most urban of all five colleges, with buildings of stately elegance spread across it.";
        map = 'silverquill_map.png';
        textref = '_silverquill.html';
    }
    if (college == 'pm') {
        src = 'prismari.png';
        collegename = 'Prismari';
        collegequote = 'Express yourself, with the elements!';
        collegedescription = "To the southwest of the Central campus there is a region of jagged rocks, rugged spires, and intense geothermal activity. This is where the Prismari College resides.";
        map = 'prismari_map.png';
        textref = '_prismari.html';
    }
    if (college == 'lh') {
        src = 'lorehold.png';
        collegename = 'Lorehold';
        collegequote = 'Leave no stone unturned!';
        collegedescription = "The Lorehold Campus is situated northwest of the central campus in a region of stark vertical relief. It's a desert-like environment with plenty of mountain mesas, as well as a great chasm filled with ruins from an ancient settlement.";
        map = 'lorehold_map.png';
        textref = '_lorehold.html';
    }
    if (college == 'qd') {
        src = 'quandrix.png';
        collegename = 'Quandrix';
        collegequote = 'Maths is magic.';
        collegedescription = "To the northeast of the Central Campus there lays a coastline, which is filled by abundant rivers and streams as well as lush woodland. This is where the Quandrix College commits their study.";
        map = 'quandrix_map.png';
        textref = '_quandrix.html';
    }
    if (college == 'wb') {
        src = 'witherbloom.png';
        collegename = 'Witherbloom';
        collegequote = 'Get your hands dirty.';
        collegedescription = "Southeast of the central campus lays a wide bayou, in which the Witherbloom campus is tucked away.";
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