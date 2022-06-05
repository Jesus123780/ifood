//public/sw.js
self.addEventListener("install", function (event) {
    console.log("Hello world from the Service Worker 🤙");
    event.waitUntil( function () {
        return self.skipWaiting();
    }());
    self.addEventListener("push", function (event) {
        console.log("Push notification received");
        event.waitUntil( function () {
            return self.registration.showNotification("Hello world from the Service Worker 🤙");
        }());
    })
    self.addEventListener("notificationclick", function (event) {
        console.log("Notification clicked");
        event.waitUntil( function () {
            return self.clients.openWindow("https://www.google.com");
        }());
    })
});