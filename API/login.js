$("button").click(function () {
    
    login($("#user").val(), $("#pass").val())

});

function login(us, ps) {
    const { createClient } = supabase;
    var anon = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkY2Nhem1uemlwcGJsbnZ2cWRwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2NzczNDkyOCwiZXhwIjoxOTgzMzEwOTI4fQ.79swd9Gvw45ziqMzXrIxPSnQU67K6swiVnSJAzujLqA';
    var url = 'https://pdccazmnzippblnvvqdp.supabase.co';
    const _supabase = createClient(url, anon);

        _supabase.from('_tblLogin').select('*').match({ log_use: us, log_pas: ps }).then(response => {
            if (response.data) {
                // alert(response.data);
                extractdata(response.data);
            } else {
                alert("Failed to log in please try again");
            }            
        })
}

function extractdata(array) {
    for (var x = 0; x < array.length; x++) {
        var data = array[x];
        var per = data['log_per'];
        if (per == 'Stu') {
            sessionStorage.setItem("Data", JSON.stringify(data['student_id']));
            window.open('studentview.html', '_self');
        }
        if (per == 'Tch') {
            window.open('teacherview.html', '_self');
        }
    }
}

function requestNewPassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,/;#[]<>?:@~{}_+-=!�$%^&*()",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}