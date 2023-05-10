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

// Sparkles
let MAX_SPEED = .009;
let MAX_TIMESTEP = 70;
let MAX_PARTICLES = 800;
let MAX_PARTICLE_SIZE = 0.8;
let START_ANGLE = 0;
let END_ANGLE = Math.PI * 2;
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let svg = d3.select("svg").attr("width", window.innerWidth).attr("height", window.innerHeight).on("mousemove", function () {
    mouseX = d3.mouse(svg.node())[0];
    mouseY = d3.mouse(svg.node())[1];
});
function tick(particleArray) {
    particleArray.forEach(d => {
        if (d.timeStep < MAX_TIMESTEP) {
            updateParticle(d);
        } else {
            resetParticle(d, mouseX, mouseY);
        }
    });
}
function resetParticle(d, mouseX, mouseY) {
    d.timeStep = Math.floor(Math.random() * MAX_TIMESTEP);
    d.speed = Math.random() * MAX_SPEED;
    d.angle = Math.random() * (END_ANGLE - START_ANGLE) + START_ANGLE;
    d.x = mouseX;
    d.y = mouseY;
}
function updateParticle(d) {
    d.timeStep++;
    d.x += Math.cos(d.angle) * d.timeStep * d.speed;
    d.y += Math.sin(d.angle) * d.timeStep * d.speed;
}
let particles = [];
for (let i = 0; i < MAX_PARTICLES; i++) {
    let newParticle = {};
    resetParticle(newParticle);
    particles.push(newParticle);
}
function update(particleArray) {
    let data = svg.selectAll(".particle").data(particles);
    data.enter().append("rect").attr("width", MAX_PARTICLE_SIZE).attr("height", MAX_PARTICLE_SIZE).style("fill", d => Math.random() > .5 ? "gold" : "gold").classed("particle", true);
    data.attr("x", d => d.x).attr("y", d => d.y);
}
setInterval(function () {
    tick(particles);
    update(particles);
}, 10);