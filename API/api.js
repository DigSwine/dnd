const { createClient } = supabase;
var anon = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkY2Nhem1uemlwcGJsbnZ2cWRwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2NzczNDkyOCwiZXhwIjoxOTgzMzEwOTI4fQ.79swd9Gvw45ziqMzXrIxPSnQU67K6swiVnSJAzujLqA';
var url = 'https://pdccazmnzippblnvvqdp.supabase.co';
const _supabase = createClient(url, anon);

// Local APIs
function removelocalStorage(key) {
    localStorage.removeItem(key)
}

async function preloadStrixhavenStarPaper() {
    _supabase.from('_tblStrixhavenStar').select('*').then(response => {
        // Package Data
        preload("newsdata", response.data, 30);
    })
}
async function preloadStrixhavenStarJobs() {
    _supabase.from('_tblJobs').select('*').order('id', 'ascending: true').then(response => {
        // Package Data
        preload("jobdata", response.data, 30);
    })
}
async function preloadCulbs() {
    _supabase.from('Clubs').select('*').order('id', { ascending: true }).then(response => {
        // Package Data
        preload("clubdata", response.data, 30);
    })
}
async function preloadAllTeachers() {
    _supabase.from('_tblTeachers').select('*').order('id', { ascending: true }).then(response => {
            // Package Data
            preload("teacherdata", response.data, 30);
    })
}
async function preloadCourses() {
    _supabase.from('class<>teacher').select('class(id, name, year, required), teacher(id, teacher_name)').then(response => {
        // Package Data
        preload("campusClasses", response.data, 60);
    });
}
async function preloadColleges() {
    _supabase.from('_tblColleges').select('*').order('id', { ascending: false }).then(response => {
        // Package Data
        preload("campusColleges", response.data, 30);
    })

}

// Session APIs
function sessionload(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
}
function removeStorage(key) {
    sessionStorage.removeItem(key)
}


async function login(us, ps) {
    await _supabase.from('_tblLogin').select('*').match({ log_use: us, log_pas: ps }).then(response => {
        if (response.data.length > 0) {
            var data = response.data[0];
            if (data.log_per == 'Stu') {
                sessionStorage.setItem("Student_Id", JSON.stringify(data.student_id));
                window.open('studentview.html', '_self');
            }
            if (data.log_per == 'Tch') {
                sessionStorage.setItem("Teacher_Id", JSON.stringify(data.teacher_id));
                window.open('teacherview.html', '_self');
            }
            return;
        } else {
            alert("Please check your login details and try again");
        }
    })
}
async function getStudentByID(sid) {
    await _supabase.from('_tblStudents').select('*').eq('id', sid).order('id', { ascending: true }).then(response => {
        sessionload("studentData", response.data);
    })
}
async function getStudentJobByStudentID(sid) {
    await _supabase.from('Job<>Student').select('Job (id, Title, Location), wage').eq('Student', sid).order('id', { ascending: true }).then(response => {
        if (response.data.length > 0) {
            sessionload("studentJob", response.data);
            getJobCoworkers(response.data[0].Job.Location);
        } else {
            sessionload("studentJob", "");
        }
    })
}
async function getJobCoworkers(loc) {
    await _supabase.from('Job<>Student').select('Job!inner(Title, Location), Student (id, name)').eq('Job.Location', loc).then(response => {
        if (response.data.length > 0) {
            sessionload("jobCoworkers", response.data);
        } else {
            sessionload("jobCoworkers", "");
        }        
    })
}
async function getClubByStudentID(sid) {
    await _supabase.from('Club<>Student').select('club (id, name, skills)').eq('student', sid).then(response => {

        if (response.data.length > 0) {
            sessionload("studentClub", response.data);
        } else {
            sessionload("studentClub", "");
        }
        
        for (var x = 0; x < response.data.length; x++) {
            getClubMembersByClubID(response.data[x].club.id);
        }
    })
}
async function getClubMembersByClubID(id) {
    await _supabase.from('Club<>Student').select('club (id), student (id, name)').eq('club', id).then(response => {
        sessionload("clubMembers" + response.data[0].club.id, response.data);
    })
}
async function getClassesbyStudentID(sid) {
    _supabase.from('class<>student').select('class(id, year, name, required)').eq('student', sid).order('class', { ascending: false }).then(response => {
        if (response.data.length > 0) {
            sessionload("studentClasses", response.data);
        } else {
            sessionload("studentClasses", "");
        }
    });
}
async function getExamsbyStudentID(sid) {
    _supabase.from('exam<>student').select('exam(*), score, studied, cheated, student(year)').eq('student', sid).order('exam', { ascending: true }).then(response => {
        sessionload("studentExams", response.data);
    });
}
async function getRelationshipsbyStudentID(id) {
    _supabase.from('npc<>student').select('npc(id, name, year, bane, boon), student, relationship').eq('student', id).order('npc', { ascending: true }).then(response => {
        if (response.data.length > 0) {
            sessionload("studentRelationships", response.data);
        } else {
            sessionload("studentRelationships", "");
        }
        
    });
}
async function saveStudentProfileData(inputs) {
    var updateobject = {};
    var yr = 0;
    for (var x = 0; x < inputs.length; x++) {
        updateobject[inputs[x].id] = inputs[x].value;
        if (inputs[x].id == "year") {
            yr = inputs[x].value;
        }
    }
    if (yr == 1) {
        if (updateobject.college != 6) {
            updateobject.college = 6
        }
    }
    // Validation
    var canUpdate = "no";
    var cleared = 0;
    if (updateobject.year > 0 && updateobject.year < 5) {
        cleared++;
    } else {
        alert("Year must be between 1 and 4");
    }
    if (updateobject.level > 0 && updateobject.level < 21) {
        cleared++;
    } else {
        alert("Level must be between 1 and 20");
    }
    if (cleared == 2) {
        canUpdate = "yes";
    }
    if (canUpdate == "yes") {
        _supabase.from('_tblStudents').update(updateobject).eq('id', sessionStorage.getItem("Student_Id")).then(response => {
            removeStorage('studentData');
            reloadPage();
        })
    }
}
async function saveStudentDetailsData(inputs) {
    var updateobject = {};
    var yr = 0;
    for (var x = 0; x < inputs.length; x++) {
        updateobject[inputs[x].id] = inputs[x].value;
        if (inputs[x].id == "year") {
            yr = inputs[x].value;
        }
    }
    if (yr == 1) {
        if (updateobject.college != 6) {
            updateobject.college = 6
        }
    }
    _supabase.from('_tblStudents').update(updateobject).eq('id', sessionStorage.getItem("Student_Id")).then(response => {
        removeStorage('studentData');
        reloadPage();
    })
}
async function saveStudentCourseChoices(choices) {
    _supabase.from('class<>student').select('class(id, year, name, required)').eq('student', sessionStorage.getItem("Student_Id")).then(response => {
        var uniqueCourses = [];
        for (var x = 0; x < response.data.length; x++) {
            var existingCourse = response.data[x]['class'];
            for (var y = 0; y < choices.length; y++) {
                if (existingCourse['id'] == choices[y]) {
                    delete choices[y];
                }
            }
        }
        var filtered = choices.filter(function (el) {
            return el != null;
        });
        $.each(filtered, function (i, el) {
            if ($.inArray(el, uniqueCourses) === -1) uniqueCourses.push(el);
        });
        if (uniqueCourses.length > 0) {
            for (var x = 0; x < uniqueCourses.length; x++) {
                _supabase.from('class<>student').insert({ 'class': uniqueCourses[x], 'student': sessionStorage.getItem("Student_Id") }).then(response => {
                    removeStorage('studentClasses');
                    reloadPage();
                });
            }
        }
    });
}
async function setstudentimg(i) {
    // upload
    const file = i.files[0];
    await _supabase
        .storage
        .from('pictures')
        .upload('students/'+file.name, file, {
            cacheControl: '3600',
            upsert: false
        })
    var src = JSON.parse(sessionStorage.getItem('studentData'))[0].picture;
    _supabase
        .storage
        .from('pictures')
        .remove(['students/'+src]);
    //change
    _supabase.from('_tblStudents').update({ 'picture': file.name }).eq('id', sessionStorage.getItem("Student_Id")).then(response => {
        removeStorage('studentData');
        reloadPage();
    })
}

async function getNPCs() {
    await _supabase.from('_tblStudents').select('*').is('player', null).order('id', { ascending: true }).then(response => {
        sessionload("NPCData", response.data);
    })
    await _supabase.from('Job<>Student').select('*').order('id', { ascending: true }).then(response => {
        sessionload("NPCJobData", response.data);
    })
    await _supabase.from('Club<>Student').select('*').order('id', { ascending: true }).then(response => {
        sessionload("NPCClubData", response.data);
    })
}
async function getTeacherNotes() {
    _supabase.from('notes').select('*').order('id', { ascending: true }).then(response => {
        sessionload("teacherNotes", response.data);
    })
}
async function getTeachers() {
    _supabase.from('_tblTeachers').select('*').order('id', { ascending: true }).then(response => {
        sessionload("teachersData", response.data);
    });
}

async function getNPCExtras() {

}

async function getPlayers() {
    _supabase.from('_tblStudents').select('*').not('player', 'is', null).order('id', { ascending: true }).then(response => {
        getPlayersJobs();
        getPlayersClubs();
        getPlayersExams();
        getPlayersRelationships();
        sessionload("playersData", response.data);
    });
}
async function getPlayersJobs() {
    _supabase.from('Job<>Student').select('Job (id, Title, Location), Student!inner(id, name), wage').not('Student.player', 'is', null).then(response => {
        preload("playersJobData", response.data, 5);
    })
}
async function getPlayersClubs() {
    _supabase.from('Club<>Student').select('club (*), student!inner(id, name)').not('student.player', 'is', null).then(response => {
        preload("playersClubData", response.data, 5);
    })
}
async function getPlayersClass() {
    _supabase.from('class<>student').select('class(id, year, name, required), student!inner(id, player)').not('student.player', 'is', null).then(response => {
        preload("playersClassData", response.data, 5);
    })
}
async function getPlayersExams() {
    _supabase.from('exam<>student').select('exam(*), student!inner(id, player), score, cheated, studied').order('exam', { ascending: true }).not('student.player', 'is', null).then(response => {
        sessionload("playersExamData", response.data);
    })
}
async function getPlayersRelationships() {
    _supabase.from('npc<>student').select('npc(id, name, year, bane, boon), student!inner(id, player), relationship').not('student.player', 'is', null).order('npc', { ascending: true }).then(response => {
        sessionload("playersRelationshipData", response.data);
        var id = document.getElementById('profile').querySelector('#pid').value;
        if (id) {
            var allrel = response.data;
            var rels = [];
            for (var y = 0; y < allrel.length; y++) {
                if (allrel[y].student.id == id) {
                    rels.push(allrel[y]);
                }
            }
            sort_playerRelationships(rels);
        }

    })
}

async function getPlayerImage(name) {
    return _supabase.storage.from('pictures').download('students/' + name);
}


async function saveSS(locations, headers, contents, options) {
    removelocalStorage('newsdata');
    var updateobject = {};
    var id = "";
    // Storys
    for (var x = 0; x < headers.length; x++) {
        if (locations[x] == '#page1') {
            id = 1;
        }
        if (locations[x] == '#pg2left') {
            id = 2;
        }
        if (locations[x] == '#pg2Mtop') {
            id = 3;
        }
        if (locations[x] == '#pg2Mbot') {
            id = 4;
        }
        if (locations[x] == '#pg2right') {
            id = 5;
        }
        updateobject['title'] = headers[x].value;
        updateobject['content'] = contents[x].value;

        _supabase.from('_tblStrixhavenStar').update(updateobject).eq('id', id).then(response => {
        })
    }
    // Header
    for (var x = 0; x < options[0].length; x++) {
        var loc = options[0][x].parentElement.classList;
        if (loc == 'issue') {
            id = 9;
        }
        if (loc == 'slogan') {
            id = 8;
        }
        if (loc == 'paperdate') {
            id = 7;
        }

        updateobject['title'] = null;
        updateobject['content'] = options[0][x].value;
        _supabase.from('_tblStrixhavenStar').update(updateobject).eq('id', id).then(response => {
        })
    }
    // Image
    id = 6;
    updateobject['title'] = null;
    updateobject['content'] = options[1].value;
    _supabase.from('_tblStrixhavenStar').update(updateobject).eq('id', id).then(response => {
    })
}
async function saveJobs(jobs) {
    removelocalStorage('jobdata');
    var updateobject = {};
    var id = "";
    for (var x = 0; x < jobs.length; x++) {
        var job = jobs[x];
        id = job.id;
        updateobject['Title'] = job.querySelector('.jtitle').value;
        updateobject['Location'] = job.querySelector('#jlocation').value;
        updateobject['Pay'] = job.querySelector('#jwage').value;

        _supabase.from('_tblJobs').update(updateobject).eq('id', id).then(response => {
        })
    }
}
async function createNewStudentData(inputs) {
    removeStorage('NPCData');
    var updateobject = {};
    for (var x = 0; x < inputs.length; x++) {
        if (inputs[x].id == "nid") {

        } else if (inputs[x].id == "year") {
            if (inputs[x].value == "") {
                updateobject[inputs[x].id] = 1;
            }
        } else {
            updateobject[inputs[x].id] = inputs[x].value;
        }
    }
    _supabase.from('_tblStudents').insert(updateobject).then(response => {
        reloadPage();
    })
}
async function saveNPCStudentData(inputs) {
    removeStorage('NPCData');
    var updateobject = {};
    var id = "";
    for (var x = 0; x < inputs.length; x++) {
        if (inputs[x].id == "nid") {
            id = inputs[x].value;
        } else {
            if (inputs[x].id != "npcList2") {
                updateobject[inputs[x].id] = inputs[x].value;
            }
        }
    }
    console.log(inputs);
    _supabase.from('_tblStudents').update(updateobject).eq('id', id).then(response => {
        // reloadPage();
    })
}
async function saveTeacherData(inputs) {
    removeStorage('teachersData');
    var updateobject = {};
    var tid = "";
    for (var x = 0; x < inputs.length; x++) {
        if (inputs[x].id == "tid") {
            tid = inputs[x].value;
        } else
            if (inputs[x].id == "schooldropdown") {
                inputs[x].id = "teacher_school";
                updateobject[inputs[x].id] = inputs[x].value;
            } else
                if (inputs[x].id == "teacherList") {

                } else {
                    updateobject[inputs[x].id] = inputs[x].value;
                }
    }
    _supabase.from('_tblTeachers').update(updateobject).eq('id', tid).then(response => {
        reloadPage();
    })
}
async function saveNotes(inputs) {
    removeStorage('teacherNotes');
    var updateobject = {};
    var noteid = "";
    for (var x = 0; x < inputs.length; x++) {
        noteid = x + 1;
        updateobject[inputs[x].id] = inputs[x].value;
        _supabase.from('notes').update(updateobject).eq('id', noteid).then(response => {
            if (x == inputs.length) {
                reloadPage();
            } else {
                setTimeout(reloadPage, 1000);
            }
        })
    }
}
async function saveStudentSchool(inputs) {
    removeStorage('playersData');
    updateobject = {};
    updateobject['college'] = inputs[0].value;
    var id = document.getElementById('pid').value;
    console.log(updateobject);
    _supabase.from('_tblStudents').update(updateobject).eq('id', id).then(response => {
        reloadPage();
    })
}
async function saveCourseChoices(inputs) {
    removeStorage('playersClassData'); 
    var sid = document.getElementById('profile').querySelector('#pid').value;
    // Delete all course choices
    _supabase.from('class<>student').delete().eq('student', sid).then(response => {
        // Create all course choices
        var updateobject = {};

        for (var x = 0; x < inputs.length; x++) {
            var selectedID = "";
            if (inputs[x].value) {
                var split = inputs[x].value.split(':');
                selectedID = split[0];

                updateobject['class'] = selectedID;
                updateobject['student'] = sid;

                _supabase.from('class<>student').insert(updateobject).then(response => {
                    reloadPage();
                })
            }
        }
    });
}
async function createRelationship(nid, sid) {
    removeStorage('playersRelationshipData');
    var updateobject = {};
    updateobject['npc'] = nid;
    updateobject['student'] = sid;
    updateobject['relationship'] = 0;

    await _supabase.from('npc<>student').insert(updateobject).then(response => {
        getPlayersRelationships();
    })
}
async function saveExamScores(exams, results) {
    removeStorage('playersExamData');    
    var sid = document.getElementById("players").querySelector('#profile').querySelector('#pid').value;
    for (var x = 0; x < exams.length; x++) {
        _supabase.from('exam<>student').update({ 'score': results[x] }).eq('exam', exams[x]).eq('student', sid).then(response => {
            reloadPage();
        })
    }
}
async function saveRelationship(cube) {
    removeStorage('playersRelationshipData');
    var sid = document.getElementById("profile").querySelector('#pid').value;
    var nid = cube.id
    var score = cube.querySelector('input').value;

    var updateobject = {};
    updateobject['relationship'] = score;

    _supabase.from('npc<>student').update(updateobject).eq('student', sid).eq('npc', nid).then(response => {
        getPlayersRelationships();
    })
}
async function setNewPass() {
    var Form = document.getElementById('newPas');
    if (Form.querySelector('#NPW').value != "") {
        // Check Confirm Password
        if (Form.querySelector('#NPW').value == Form.querySelector('#CNPW').value) {
            var id = "";
            if (sessionStorage.getItem("Student_Id")) {
                id = sessionStorage.getItem("Student_Id");
            }
            // Check Current Password is Correct
            _supabase.from('_tblLogin').select('log_use').eq('student_id', id).eq('log_pas', Form.querySelector('#CPW').value).then(response => {
                if (response.data.length > 0) {
                    // Update Password
                    _supabase.from('_tblLogin').update({ log_pas: Form.querySelector('#NPW').value }).eq('student_id', id).eq('log_pas', Form.querySelector('#CPW').value).then(response => {
                        alert("Your password has been updated");
                        reloadPage();
                    })
                }
            });
        }
    }
}