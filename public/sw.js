self.addEventListener('push', async e => {
    console.log('New push message!');

    self.registration.showNotification('Title', {
        body: e.stopImmediatePropagation.text(),
        icon: '/images/icon.png',
    });
});

self.addEventListener('sync', event => {
    switch (event.tag) {
        case 'sync':
            console.log('Sync operation');
            // fetch
            break;
        default:
            console.log(`Unknown sync operation for ${event.tag}`);
    }
});

self.addEventListener('periodicsync', event => {
    switch (event.tag) {
        case 'periodicSync':
            console.log('periodicSync operation');
            // fetch
            break;
        default:
            console.log(`Unknown periodic sync operation for ${event.tag}`);
    }
});

self.addEventListener('backgroundfetchsuccess', async event => {
    const downloadedFiles = await event.registration.matchAll();
    console.log('Files received');
    console.log(downloadedFiles);
});

self.addEventListener('backgroundfetchclick', event => {

});

self.addEventListener('backgroundfetchfailure', event => {

});