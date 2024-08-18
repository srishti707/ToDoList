
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
    apiKey: "AIzaSyDgZLdj-JGF57srxDflV1bmEJmhfOjpPv4",
    authDomain: "todo-list-a08f7.firebaseapp.com",
    projectId: "todo-list-a08f7",
    storageBucket: "todo-list-a08f7.appspot.com",
    messagingSenderId: "414003833930",
    appId: "1:414003833930:web:35b1b363a70229c7834ab3",
    measurementId: "G-HCY7B7ZP9H"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  // eslint-disable-next-line no-restricted-globals
  self.registration.showNotification(notificationTitle, notificationOptions);
});