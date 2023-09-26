$("button").click(function () {
    login($("#user").val(), $("#pass").val())
});

function requestNewPassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,/;#[]<>?:@~{}_+-=!£$%^&*()",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}