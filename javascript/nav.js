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
        url = 'libary.html';
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

function logot() {
    sessionStorage.clear();
    if (window.location.href.includes('studentview') || window.location.href.includes('teacherview')) {
        window.location = 'login.html';
    } else {
        window.location = window.location.href;
    }
}