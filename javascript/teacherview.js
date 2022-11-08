$(document).ready(function () {
    getAll("all");

    //wait
    setTimeout(function () {
        //Houses
        for (var x = 0; x < CollegeName.length; x++) {
            $("#collegeSelection").append('<option value="' + CollegeName[x] + ' - ' + x + '">' + CollegeName[x] + '</option>');
        }
    }, 1000);
});

// College Selection Change
$("#collegeSelection").change(function () {
    var selectedval = $("#collegeSelection option:selected").val();
    if (selectedval != "default") {
        changeSelectors(selectedval);
        unlockCollege("unlock");
    } else {
        changeSelectors('null')
        unlockCollege("lock");
    }
});

// Student Player Change
$("#collegeStudents").change(function () {
    var selectedval = $("#collegeStudents option:selected").val();
    if (selectedval != "default") {
        editButtons('unlock');
        getStudentData(selectedval);
    }
});


function changeSelectors(house) {
    var split = house.split(" - ");
    var house = split[0];

    removeAllSelectors();

    // Students
    for (var x = 0; x < StudentName.length; x++) {
        if (StudentHouse[x]) {
            if (StudentHouse[x] == house) {
                if (StudentPlayer[x] != "NPC") {
                    $("#collegeStudents").append('<option value="' + StudentName[x] + ' - ' + x + '">' + StudentName[x] + " (" + StudentPlayer[x] + ") " + '</option>');
                } else {
                    $("#collegeStudents").append('<option value="' + StudentName[x] + ' - ' + x + '">' + StudentName[x] + '</option>');
                }
            }
        } else {
            console.log("No student data avaliable, reloading data");
            getAll("students");
        }
    }
}

function removeAllSelectors() {
    // College Students
    $("#collegeStudents").find('option').remove().end().append('<option> --- Please Select --- </option>').val('default');
    $("#collegeStudents").find('option:first').attr("selected", "selected");
}

function getStudentData(data) {

    var split = data.split(" - ");
    var student = split[0];

    for (var x = 0; x < StudentName.length; x++) {
        if (StudentName[x] == student) {
            //studentid
            selectedstudentid = StudentID[x];
            // Personal Details
            $("#personName").val(StudentName[x]);
            $("#personRace").val(StudentRace[x]);
            $("#personGender").val(StudentGender[x]);
            $("#personAge").val(StudentAge[x]);

            // Relationships
            $("#relMorgan").val(RelMorgan[x]);
            $("#relSami").val(RelSami[x]);
            $("#relTimo").val(RelTimo[x]);
            $("#relMartin").val(RelMart[x]);
            $("#relWill").val(RelWill[x]);
            $("#relLover").val(RelLover[x]);
            $("#relRival").val(RelRival[x]);
        }
    }
}

// College Info Enable/Disable
function unlockCollege(turn) {
    var names = ['collegeStudents'];
    for (var x = 0; x < names.length; x++) {
        toUnlock(names[x], turn);
    }
}

function editPeople(turn, studentid) {
    var names = ['personName', 'personRace', 'personGender', 'personAge', 'btnSaveSelected'];
    for (var x = 0; x < names.length; x++) {
        toUnlock(names[x], turn);
        if (turn == "lock") {
            if (x == names.length - 1) {
                editAll('students', studentid);
            }
        }
    }
}

function editButtons(turn) {
    var names = ['btnEditSelected'];
    for (var x = 0; x < names.length; x++) {
        toUnlock(names[x], turn);
    }
}

function toUnlock(element, turn) {
    if (turn == "unlock") {
        document.getElementById(element).removeAttribute("disabled");
    } else {
        document.getElementById(element).setAttribute('disabled', true);
    }
}