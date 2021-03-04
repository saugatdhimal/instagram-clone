import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDMgRXZCXfLaZy3bZwBDGjKuIEE-O7EHf4",
  authDomain: "instagram-clone77.firebaseapp.com",
  databaseURL: "https://instagram-clone77-default-rtdb.firebaseio.com",
  projectId: "instagram-clone77",
  storageBucket: "instagram-clone77.appspot.com",
  messagingSenderId: "629421719108",
  appId: "1:629421719108:web:16de2ab8a33400de0f4611",
  measurementId: "G-24CVXWPLE8"
});

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export { db, auth, storage }