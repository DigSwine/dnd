$(document).ready(function () {
    checkExpiry();
    var preloaded = preloadCheck();
    if (!preloaded) {
        preload("preload", "default");
        getAllPreloadAPIData();
    }
});

// Check if data has been preloaded
function preloadCheck() {
    var tester = localStorage.getItem("preload");
    if (tester) {
        return true;
    }
}

// Pre load data
function preload(key, value) {
    var ttl = 900000;
    const now = new Date()
    const item = {
        value: value,
        expiry: now.getTime() + ttl,
    }
    localStorage.setItem(key, JSON.stringify(item));    
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