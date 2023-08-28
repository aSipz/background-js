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
    const data = {
        message: 'Hello from frontend'
    };
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    navigator.sendBeacon('/log', blob);
});

// Background Sync
document.getElementById("btnSync").addEventListener("click", async event => {
    const swReg = await navigator.serviceWorker.ready;
    if ('sync' in swReg) {
        swReg.sync.register('sync');
    }
});

// Background Periodic Sync
document.getElementById("btnPeriodicSync").addEventListener("click", async event => {
    const swReg = await navigator.serviceWorker.ready;
    if ('periodicSync' in swReg) {
        const permissionStatus = await navigator.permissions.query({
            name: 'periodic-background-sync'
        });
        if (permissionStatus.state === 'granted') {
            swReg.periodicSync.register('periodicSync', {
                minInterval: 12 * 60 * 60 * 1000
            });
        }
    }
});

// Background Fetch
document.getElementById("btnFetch").addEventListener("click", async event => {
    const swReg = await navigator.serviceWorker.ready;
    if ('backgroundFetch' in swReg) {
        const fetch = await swReg.backgroundFetch.fetch(
            'fetch-name', ['/media/audio.mp3', '/media/video.mp4'],
            {
                title: 'Media files',
                icons: [
                    {
                        src: '/media/thumb.png',
                        type: 'image/png',
                        sizes: '800x800',
                    },
                ],
            }
        );
    }
});