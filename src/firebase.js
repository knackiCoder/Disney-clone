import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyDHRvQlmXmam6I3g3-omFOg-S3Yu0Jg10E",
    authDomain: "disney-plus-clone-6b00f.firebaseapp.com",
    projectId: "disney-plus-clone-6b00f",
    storageBucket: "disney-plus-clone-6b00f.appspot.com",
    messagingSenderId: "1074254483460",
    appId: "1:1074254483460:web:d23ef75b0c9156818f2551",
    measurementId: "G-9MVN74ZRL9"
};
  
  // Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;