$(document).ready(async function () {
    await checkExpiry();
    var tocheck = preloadCheck('preload');
    if (!tocheck) {
        preload("preload", "default", 30);
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

function preloadCheck(key) {
    var ls = localStorage.getItem(key);
    if (ls) {
        return true;
    }
}
function preload(key, value, time) {
    var ttl = time * 60000;
    const now = new Date()
    const item = {
        value: value,
        expiry: now.getTime() + ttl,
    }
    localStorage.setItem(key, JSON.stringify(item));
}
function checkExpiry() {
    const keys = [...Array(localStorage.length)].map((o, i) => {
        return localStorage.key(i);
    })
    for (var x = 0; x < keys.length; x++) {
        if (keys[x] == "debug") {

        } else {
            getWithExpiry(keys[x]);
        }
    }
}
function getWithExpiry(key) {
    const itemStr = localStorage.getItem(key)
    // if the item doesn't exist, return null
    if (!itemStr) {
        return null
    }
    const item = JSON.parse(itemStr)
    const now = new Date()
    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
        // If the item is expired, delete the item from storage
        // and return null
        localStorage.removeItem(key)
        console.log(key + " has been removed");
        return null
    } else {
        console.log(key + " has not been removed");
    }
    return item.value
}