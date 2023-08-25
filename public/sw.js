self.addEventListener('push', async e => {
    console.log('New push message!');

    if ('Notification' in window) {
        if (Notification.permission === 'granted') {

        }
    }

    const status = await Notification.requestPermission();
});