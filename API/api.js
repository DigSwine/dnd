const { createClient } = supabase;
var anon = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkY2Nhem1uemlwcGJsbnZ2cWRwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2NzczNDkyOCwiZXhwIjoxOTgzMzEwOTI4fQ.79swd9Gvw45ziqMzXrIxPSnQU67K6swiVnSJAzujLqA';
var url = 'https://pdccazmnzippblnvvqdp.supabase.co';
const _supabase = createClient(url, anon);

// Local APIs
async function preloadStrixhavenStarPaper() {
    _supabase.from('_tblStrixhavenStar').select('*').then(response => {
        // Package Data
        preload("newsdata", response.data);
    })
}
async function preloadStrixhavenStarJobs() {
    _supabase.from('_tblJobs').select('*').order('id', 'ascending: true').then(response => {
        // Package Data
        preload("jobdata", response.data);
    })
}
async function preloadCulbs() {
    _supabase.from('Clubs').select('*').order('id', { ascending: true }).then(response => {
        // Package Data
        preload("clubdata", response.data);
    })
}
async function preloadAllTeachers() {
    _supabase.from('_tblTeachers').select('*').order('id', { ascending: true }).then(response => {
            // Package Data
            preload("teacherdata", response.data);
    })
}
async function preloadCourses() {
    _supabase.from('class<>teacher').select('class(id, name, year, required), teacher(id, teacher_name)').then(response => {
        // Package Data
        preload("campusClasses", response.data);
    });
}
async function preloadColleges() {
    _supabase.from('_tblColleges').select('*').order('id', { ascending: false }).then(response => {
        // Package Data
        preload("campusColleges", response.data);
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
            getJobCoworkers(response.data[0].Job.id);
        } else {
            sessionload("studentJob", "");
        }
    })
}
async function getJobCoworkers(jobid) {
    await _supabase.from('Job<>Student').select('Student (id, name)').eq('Job', jobid).then(response => {
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
        sessionload("studentRelationships", response.data);
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
async function saveCourseChoices(choices) {
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