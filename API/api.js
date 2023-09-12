const { createClient } = supabase;
var anon = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkY2Nhem1uemlwcGJsbnZ2cWRwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2NzczNDkyOCwiZXhwIjoxOTgzMzEwOTI4fQ.79swd9Gvw45ziqMzXrIxPSnQU67K6swiVnSJAzujLqA';
var url = 'https://pdccazmnzippblnvvqdp.supabase.co';
const _supabase = createClient(url, anon);

async function getStudentByID(sid) {
    const { data, error } = await _supabase.from('_tblStudents').select('*').eq('id', sid).order('id', { ascending: true });
    return data[0];
}
async function getStudentJobByStudentID(sid) {
    const { data, error } = await _supabase.from('Job<>Student').select('Job (id, Title, Location), wage').eq('Student', sid);
    return data[0];
}
async function getJobCoworkers(jobid) {
    const { data, error } = await _supabase.from('Job<>Student').select('Student (id, name)').eq('Job', jobid);
    return data;
}
async function getClubByStudentID(sid) {
    const { data, error } = await _supabase.from('Club<>Student').select('club (id, name, skills)').eq('student', sid);
    return data;
}
async function getClubMembersByClubID(id) {
    const { data, error } = await _supabase.from('Club<>Student').select('student (id, name)').eq('club', id);
    return data;
} 

// Preload APIs
async function getAllPreloadAPIData() {
    getStrixhavenStarPaper();
    getStrixhavenStarJobs();
}
// about - non
// map info - non, local
// Strixhaven Star, 2.
async function getStrixhavenStarPaper() {
    _supabase.from('_tblStrixhavenStar').select('*').then(response => {
        // Package Data
        for (var x = 0; x < response.data.length; x++) {
            var data = response.data[x];
            var key = "strixstar" + data.location;
            var value = data;
            preload(key, value);
        }       
    })
}
async function getStrixhavenStarJobs() {
    _supabase.from('_tblJobs').select('*').order('id', 'ascending: true').then(response => {
        // Package Data
        preload("jobdata", response.data);
    })
}

