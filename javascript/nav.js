function swapnav(type) {
    var nav = document.getElementById("navigation");
    var subNav = nav.querySelector('.NavSubContainer');
    var subNav2 = nav.querySelector('.logState');
    //close
    if (type == 'close') {
        nav.style.display = "none";
    } else {
        //open
        if (type == 'open') {
            if (sessionStorage.getItem('Student_Id') || sessionStorage.getItem('Teacher_Id')) {
                
                var logout = subNav.querySelector('#logout');
                if (!logout) {
                    subNav.querySelector('#login').remove();

                    var newLogout = document.createElement('a');
                    newLogout.id = "logout";
                    newLogout.innerText = "Logout";
                    newLogout.addEventListener("click", logot, false);

                    var newProfile = document.createElement('a');
                    newProfile.id = "profile";
                    newProfile.innerText = "Profile";
                    if (sessionStorage.getItem('Student_Id')) {
                        newProfile.onclick = function () {
                            gopage("profile");
                        };
                    }
                    if (sessionStorage.getItem('Teacher_Id')) {
                        newProfile.onclick = function () {
                            gopage("teacher");
                        };
                    }

                    subNav2.appendChild(newProfile);
                    subNav2.appendChild(newLogout);

                    var loc = window.location.pathname;
                    var page = loc.split("/").pop().split(".");
                    page = page[0];
                    if (page == "studentview" || page == "teacherview") {
                        var nav = document.getElementById('navigation');
                        var navigationChoices = nav.querySelector('.NavSubContainer').querySelector('#profile');
                        navigationChoices.style.textDecoration = "underline";
                        navigationChoices.style.color = "darkgoldenrod";
                    }

                }
            }
            if (nav) {
                nav.style.display = "block";
            }            
        }
    }
}

function gopage(goto) {
    var url = '';
    if (goto == 'about') {
        url = 'about.html';
    }
    if (goto == 'maps') {
        url = 'campusmap.html';
    }
    if (goto == 'libary') {
        url = 'library.html';
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
    if (goto == 'profile') {
        url = 'studentview.html';
    }
    if (goto == 'teacher') {
        url = 'teacherview.html';
    }
    window.location = url;
}

$(function highlightNav() {
    var loc = window.location.pathname;
    var page = loc.split("/").pop().split(".");
    page = page[0];

    var nav = document.getElementById('navigation');
    if (nav) {
        var navigationChoices = nav.querySelector('.NavSubContainer').querySelectorAll('a');
        for (var x = 0; x < navigationChoices.length; x++) {
            var listName = navigationChoices[x].innerText.toLowerCase();
            if (page == "campusmap") {
                page = "university information";
            }
            if (page == "strixhavenstar") {
                page = "strixhaven star";
            }
            if (page == "extra") {
                page = "extracurriculars";
            }
            if (page == listName) {
                navigationChoices[x].style.textDecoration = "underline";
                navigationChoices[x].style.color = "darkgoldenrod";
            }
        }
    } else {
        setTimeout(highlightNav, 500)
    }
})

function logot() {
    sessionStorage.clear();
    if (window.location.href.includes('studentview') || window.location.href.includes('teacherview')) {
        window.location = 'login.html';
    } else {
        window.location = window.location.href;
    }
}