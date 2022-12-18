$(document).ready(function () {
    getAll("all");
});

// College Selection Change
$("#toget").change(function () {
    var selectedval = $("#toget option:selected").val();
    if (selectedval != "default") {
        unlockoptions('unlock');
    } else {
        unlockoptions('lock');
    }
});

function unlockoptions(style) {
    var options = ['contoladd', 'contoledit', 'contoldel'];

    for (var x = 0; x < options.length; x++) {
        if (style == 'unlock') {
            document.getElementById(options[x]).disabled = false;
        } else {
            document.getElementById(options[x]).disabled = true;
        }
    }
}

function getmain(toget) {
    var selectedval = $("#toget option:selected").val();
    if (toget == 'add') {
        if (selectedval == 'news') {
            alert("Talk to me, this doesnt work sadly <3");
        }
        if (selectedval == 'stu') {
            textref = '_addstudent.html';
        }
    }
    if (toget == 'edit') {
        if (selectedval == 'news') {
            textref = '_editstar.html';
        }
    }

    var htmlloc = '/views/teacherView/';
    textref = htmlloc + textref;

    $.ajax({
        url: textref,
        type: 'GET',
        success: function (data) {
            $('#tocontrol').html(data);
        }
    });

}