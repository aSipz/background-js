navigator.serviceWorker.register('/sw.js');

// Page Visibility API
let backgroundInitialTimestamp;

window.addEventListener('visibilitychange', e => {
    if (document.visibilityState === 'hidden') {
        const now = new Date().toLocaleTimeString();
        log(`Going to the background at ${now}`);
        backgroundInitialTimestamp = performance.now();
    } else {
        const timeElapsed = parseInt(performance.now() - backgroundInitialTimestamp);
        log(`Back from background after ${timeElapsed / 1000}s`);
    }
});

window.addEventListener('freeze', e => {
    // only for chromium
    // will be discarded, time to save state
});

window.addEventListener('resume', e => {
    // only for chromium
    // back from suspension, no need to restore state
});

window.addEventListener('DOMContentLoaded', e => {
    if (document.wasDiscarded) {
        // only for chromium
        // was discarded, need to restore state
    }
})

// Beacon
document.getElementById("btnBeacon").addEventListener("click", event => {
});

// Background Sync
document.getElementById("btnSync").addEventListener("click", async event => {

});

// Background Periodic Sync
document.getElementById("btnPeriodicSync").addEventListener("click", async event => {

});

// Background Fetch
document.getElementById("btnFetch").addEventListener("click", async event => {

});