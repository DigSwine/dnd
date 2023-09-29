$(document).ready(async function () {
    await checkExpiry();
    var tocheck = preloadCheck('preload');
    if (!tocheck) {
        preload("preload", "default");
    }
    tocheck = preloadCheck('newsdata');
    if (!tocheck) {
        preloadStrixhavenStarPaper();
    }
    tocheck = preloadCheck('jobdata');
    if (!tocheck) {
        preloadStrixhavenStarJobs();
    }
    tocheck = preloadCheck('clubdata');
    if (!tocheck) {
        preloadCulbs();
    }
    tocheck = preloadCheck('teacherdata');
    if (!tocheck) {
        preloadAllTeachers();
    }
    tocheck = preloadCheck('campusClasses');
    if (!tocheck) {
        preloadCourses();
    }    
    tocheck = preloadCheck('campusColleges');
    if (!tocheck) {
        preloadColleges();
    }    
});