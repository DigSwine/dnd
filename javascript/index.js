$(document).ready(function () {
    sessionStorage.clear();
    home();
});

var us, ps = '';
$('#User').change(function () {
    us = $('#User').val();
});

$('#Pass').change(function () {
    ps = $('#Pass').val();
});

$('#logsub').click(function () {
    login(us, ps);
})

function home() {
    //home
    $.ajax({
        method: 'GET',
        url: 'views/landing_options/_strix.html',
    }).done(function (data) {
        $('#pagename').text('Strixhaven University');
        $('#main').html(data);
    })

}

function maps() {
    //map
    $.ajax({
        method: 'GET',
        url: 'views/landing_options/_maps.html',
    }).done(function (data) {
        $('#pagename').text('University Campus Maps');
        $('#main').html(data);
    })
}

function admin() {
    //admin
    $.ajax({
        method: 'GET',
        url: 'views/landing_options/_admin.html',
    }).done(function (data) {
        $('#pagename').text('Administaration Team');
        $('#main').html(data);
    })
}

function extra() {
    //extracurr
    $.ajax({
        method: 'GET',
        url: 'views/landing_options/_extracurr.html',
    }).done(function (data) {
        $('#pagename').text('Extracurricular Activites');
        $('#main').html(data);
    })
}

function straxstar() {
    //strixstar
    $.ajax({
        method: 'GET',
        url: 'views/landing_options/_strixstar.html',
    }).done(function (data) {
        $('#pagename').text('Strixhaven Star');
        $('#main').html(data);
    })
}
