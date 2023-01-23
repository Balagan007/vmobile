import firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyBkVBGaY9uAnO5ihRGDyNH2jcVGjuyfgBs",
    authDomain: "vmobile-v1.firebaseapp.com",
    projectId: "vmobile-v1",
    storageBucket: "vmobile-v1.appspot.com",
    messagingSenderId: "341675811998",
    appId: "1:341675811998:web:5a1a1e17b757cbe0df478f",
    measurementId: "G-D0BL8NSHMR"
  };
  
const firebaseApp=firebase.initializeApp(firebaseConfig);
const db=firebase.firestore();
const auth = firebase.auth();
const firebaseSystem = {
  "db":db,
  "auth": auth
}

export default firebaseSystem;