import firebase from 'firebase/app';
import 'firebase/auth';

// if (typeof window !== 'undefined' && !firebase.apps.length) {
  if(!firebase.apps.length){
    firebase.initializeApp({
    apiKey: "AIzaSyA0BB4RHUtATWAP6iql7wub_11wlr58jig",
    authDomain: "cruisebd-82430.firebaseapp.com",
    databaseURL: "https://cruisebd-82430.firebaseio.com",
    projectId: "cruisebd-82430",
    storageBucket: "cruisebd-82430.appspot.com",
    messagingSenderId: "777249530108",
    appId: "1:777249530108:web:dffa747e46feb7d922b779",
    measurementId: "G-6QP44NBCV0"
,
  });
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
  }

export { firebase };