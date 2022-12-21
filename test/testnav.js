var us, ps = '';
$('#User').change(function () {
   // us = $('#User').val();
});

$('#Pass').change(function () {
    // ps = $('#Pass').val();
});

$('#logsub').click(function () {
    // login('btn', us, ps);
})

$('#bmlogo').click(function () {
    // login('bm', us, ps);
})

// https://fontawesome.com/v4/icons/

var navoptions = ["one", "two", "three", "four", "five", "six", "seven"];
var xwords = ["zero", "one", "two", "three", "four", "five", "six"];
var delayInMilliseconds = 5000; //1 second

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

    if (goto == 'home') {
        url = 'index.html';
    }
    if (goto == 'about') {
        url = 'about.html';
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
    if (goto == 'login') {
        url = 'login.html';
    }

    // window.location = url;
    swapnav('close');
}

$(".clickcard").click(function () {
    $(this).toggleClass("flipped");
});
