function cookify(cname, cvalue) {
    //Check if cookie exists
    var checked = checkCookie(cname);

    if (checked == 0) {
        const d = new Date();
        d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie(cname) {
    var checker = 0;
    let cookie = getCookie(cname);
    if (cookie != "") {
        checker = 1;
    }
    return checker;
}
