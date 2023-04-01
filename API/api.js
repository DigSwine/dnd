//Database Scripts
function getAll(toget) {
    const { createClient } = supabase;

    var anon = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkY2Nhem1uemlwcGJsbnZ2cWRwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2NzczNDkyOCwiZXhwIjoxOTgzMzEwOTI4fQ.79swd9Gvw45ziqMzXrIxPSnQU67K6swiVnSJAzujLqA';
    var url = 'https://pdccazmnzippblnvvqdp.supabase.co';
    const _supabase = createClient(url, anon);

    if (toget == "college" || toget == "all") {
        // College Data
        _supabase.from('view_allcolleges').select('*').then(response => {
            // extractdata('colleges', response.data);
        })
    }

    if (toget == "student" || toget == "all") {
        // Student Data
        _supabase.from('view_allstudents').select('*').then(response => {
            // extractdata('students', response.data);
        })
    }

    if (toget == "collegemembers" || toget == "all") {
        // Link Students to Colleges
        _supabase.from('view_student_college').select('*').then(response => {
            // extractdata('collegemembers', response.data);
        })
    }

    // Exam Data
}

