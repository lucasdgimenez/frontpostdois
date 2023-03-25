 import firebase from "firebase/app"
 import "firebase/firestore"
 import "firebase/auth"
 
 // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyDiZfSUDYPkhj6dgCRnxuJNnGYmQbWGrdk",
    authDomain: "frontpost-610f9.firebaseapp.com",
    projectId: "frontpost-610f9",
    storageBucket: "frontpost-610f9.appspot.com",
    messagingSenderId: "507206404628",
    appId: "1:507206404628:web:02a3f2752291d1e88df501",
  };
  // Initialize Firebase
  if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  export default firebase;