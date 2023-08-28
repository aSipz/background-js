var nedb = require("nedb");
var db = new nedb({ filename: "users.db", autoload: true });
var webpush = require('web-push');

// GCM is deprecated but you can still have some users out there using it
// Get these keys creating a project in Google Firebase
// var GCMKey = "AIzaSyBuoU-dxhfGuB7geAi4TgqIy4viLxwxJLE";
// webpush.setGCMAPIKey(GCMKey);

// Get these keys using the web-push CLI only once
// run `npx web-push generate-vapid-keys`
var publicKey = "BJUTIE06W-naqETGgBB4uR8lJ-JkZo3fxRjLKHV9oGXxdl0wtp9gzivEa66cN9ikbcqG8C3eWvFRywdaLPpyJY8";
var privateKey = "79e_1aHpOAuStBz_5uJUFaEgTq_IhropQ3khrufdG4Q";

webpush.setVapidDetails('mailto:youremail@yourdomain.org',
    publicKey, privateKey);

var message = process.argv[2] || "This is a test push message from the server";

db.find({}, function (err, users) {
    users.forEach(function (user) {
        const pushSubscription = {
            endpoint: user.endpoint,
            keys: {
                auth: user.keys.auth,
                p256dh: user.keys.p256dh
            }
        };
        var object = {
            text: message,
            customData: ["some", "test", "data"]
        }
        // We can send plain text or an object encoded as JSON string
        webpush.sendNotification(pushSubscription, JSON.stringify(object))
            .then(function () {
                console.log("Message sent to " + user.endpoint.substring(140));
            })
            .catch(function (error) {
                if (error.statusCode >= 400) {
                    // delete the user from the DB?

                }
                //            console.log(error);
            })
    });
});