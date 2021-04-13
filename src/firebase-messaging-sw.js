importScripts('https://www.gstatic.com/firebasejs/8.2.9/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.9/firebase-messaging.js');
firebase.initializeApp({
    apiKey: "AIzaSyBy512H4VrwbcrKdn1388HZn5HAV9EH6H0",
    authDomain: "test-e701a.firebaseapp.com",
    projectId: "test-e701a",
    storageBucket: "test-e701a.appspot.com",
    messagingSenderId: "671393538913",
    appId: "1:671393538913:web:0a0611c0dfaf2aed021b20",
    measurementId: "G-C8ESBBSDBQ"
});
const messaging = firebase.messaging();