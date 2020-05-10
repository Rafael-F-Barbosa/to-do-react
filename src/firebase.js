// import firebase from 'firebase'
import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCqA-Q7-ugQSpx03MbAWyul7gMu2JnHTbI",
    authDomain: "to-do-react-10320.firebaseapp.com",
    databaseURL: "https://to-do-react-10320.firebaseio.com",
    projectId: "to-do-react-10320",
    storageBucket: "to-do-react-10320.appspot.com",
    messagingSenderId: "877841554206",
    appId: "1:877841554206:web:29d753367ea5633ad3c70f"
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  export {db};