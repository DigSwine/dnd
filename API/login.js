$("button").click(function () {
    login($("#user").val(), $("#pass").val())
});

function login(us, ps) {
    _supabase.from('_tblLogin').select('*').match({ log_use: us, log_pas: ps }).then(response => {
        extractdata(response.data);        
    })
}

function extractdata(array) {
    for (var x = 0; x < array.length; x++) {
        var data = array[x];
        var per = data['log_per'];
        if (per == 'Stu') {
            sessionStorage.setItem("Student_Id", JSON.stringify(data['student_id']));
            window.open('studentview.html', '_self');
        }
        if (per == 'Tch') {
            sessionStorage.setItem("Teacher_Id", JSON.stringify(data['teacher_id']));
            window.open('teacherview.html', '_self');
        }
    }
    if (array.length == 0) {
        alert("Please check your login details and try again");
    }
}

function requestNewPassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,/;#[]<>?:@~{}_+-=!£$%^&*()",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}