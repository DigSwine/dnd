//Database Scripts
function getAll(toget) {
    const { createClient } = supabase;

    var anon = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkY2Nhem1uemlwcGJsbnZ2cWRwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2NzczNDkyOCwiZXhwIjoxOTgzMzEwOTI4fQ.79swd9Gvw45ziqMzXrIxPSnQU67K6swiVnSJAzujLqA';
    var url = 'https://pdccazmnzippblnvvqdp.supabase.co';
    const _supabase = createClient(url, anon);

    if (toget == "college" || toget == "all") {
        // College Data
        _supabase.from('view_allcolleges').select('*').then(response => {
            extractdata('colleges', response.data);
            console.log("College Data Loaded");
        })
    }

    if (toget == "student" || toget == "all") {
        // Student Data
        _supabase.from('view_allstudents').select('*').then(response => {
            extractdata('students', response.data);
            console.log("Student Data Loaded");
        })
    }

    if (toget == "collegemembers" || toget == "all") {
        // Link Students to Colleges
        _supabase.from('view_student_college').select('*').then(response => {
            extractdata('collegemembers', response.data);
            console.log("College Members Data Loaded");
        })
    }

    // Exam Data
}

function extractdata(datatype, array) {
    for (var x = 0; x < array.length; x++) {
        var data = array[x];

        // colleges
        if (datatype == 'colleges') {
            CollegeName.push(data['college_name']);
            // console.log(CollegeName);
            //console.log(data);
        }

        // Students
        if (datatype == 'students') {
            StudentID.push(data['id']);
            StudentName.push(data['character_name']);
            StudentRace.push(data['character_race']);
            StudentAge.push(data['character_age']);
            StudentGender.push(data['character_gender']);
            StudentPlayer.push(data['character_player']);

            /*
            StudentHouse.push();
            StudentDetail4.push();
            StudentDetail5.push();
            StudentDetail6.push();
            */
        }

        // College Members
        if (datatype == 'collegemembers') {
            var college_id = data['college_id'] - 1;
            var student_id = data['student_id'] - 1;

            console.log(student_id + " is in " + college_id);

            StudentHouse[student_id] = CollegeName[college_id];
        }
    }
}

function editAll(tosave, toupdateid) {
    const { createClient } = supabase;

    var anon = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkY2Nhem1uemlwcGJsbnZ2cWRwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2NzczNDkyOCwiZXhwIjoxOTgzMzEwOTI4fQ.79swd9Gvw45ziqMzXrIxPSnQU67K6swiVnSJAzujLqA';
    var url = 'https://pdccazmnzippblnvvqdp.supabase.co';
    const _supabase = createClient(url, anon);

    if (tosave == "college" || tosave == "all") {
        // College Data

    }

    if (tosave == "students" || tosave == "all") {
        //Updata Variables
        // Personal Details
        for (var x = 0; x < StudentName.length; x++) {
            if (StudentID[x] == selectedstudentid) {
                StudentName[x] = $("#personName").val();
                StudentRace[x] = $("#personRace").val();
                StudentGender[x] = $("#personGender").val();
                StudentAge[x] = $("#personAge").val();
                break;
            }
        }

        // Student Data
        _supabase.from('_tblStudents').update({
            character_name: StudentName[x],
            character_age: StudentAge[x],
            character_gender: StudentGender[x],
            character_race: StudentRace[x]
        }).eq('id', toupdateid).then(response => {
            //console.log(response);
        })
    }

    if (tosave == "collegemembers" || tosave == "all") {
        // Link Students to Colleges

    }
}

// Student Functions
function getstudent(theid) {
    const { createClient } = supabase;

    var anon = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkY2Nhem1uemlwcGJsbnZ2cWRwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2NzczNDkyOCwiZXhwIjoxOTgzMzEwOTI4fQ.79swd9Gvw45ziqMzXrIxPSnQU67K6swiVnSJAzujLqA';
    var url = 'https://pdccazmnzippblnvvqdp.supabase.co';
    const _supabase = createClient(url, anon);

    // Student Data
    _supabase.from('_tblStudents').select('*').eq('id', theid).then(response => {
        setdataabout(response.data);
    })
}