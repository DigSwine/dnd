function login(clicked, us, ps) {
    const { createClient } = supabase;

    var anon = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkY2Nhem1uemlwcGJsbnZ2cWRwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2NzczNDkyOCwiZXhwIjoxOTgzMzEwOTI4fQ.79swd9Gvw45ziqMzXrIxPSnQU67K6swiVnSJAzujLqA';
    var url = 'https://pdccazmnzippblnvvqdp.supabase.co';
    const _supabase = createClient(url, anon);

    if (ps != "newps" && clicked == 'btn') {
        _supabase.from('_tblLogin').select('*').match({ log_use: us, log_pas: ps }).then(response => {
            extractdata(clicked, response.data);
        })
    } else if (ps != "newps" && clicked == 'bm') {
        _supabase.from('_tblLogin').select('*').match({ log_use: us, log_pas: ps }).then(response => {
            extractdata(clicked, response.data);
        })
    } else {
        console.log(clicked + " " + ps);
        alert(requestNewPassword());
    }
}
function extractdata(type, array) {
    for (var x = 0; x < array.length; x++) {
        var data = array[x];
        var per = data['log_per'];

        if (type == 'btn') {
            if (per == 'Stu') {
                sessionStorage.setItem("Data", JSON.stringify(data));
                window.open('views/studentView/studentview.html', '_self');
            }
            if (per == 'Tch') {
                window.open('views/teacherView/teacherview.html', '_self');
            }
        }
        if (type == 'bm') {
            sessionStorage.setItem("Data", JSON.stringify(data));
            window.open('blackmarket.html', '_self');
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