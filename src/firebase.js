// import firebase from 'firebase'
import firebase from 'firebase/app';
import 'firebase/firestore';

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

  // function dataBase() {
    // const projectCol = db.collection('projects');
    // const projects = [];
    // db.collection('projects').get().then(snapshot => {
      // snapshot.docs.forEach(doc => {
        // const projectId = doc.id;
        // const tasks = [];
        // const project = {
          // id: doc.data().id,
          // name: doc.data().name,
        // }
        // projectCol.doc(projectId).collection('tasks').get().then((s) => {
          // s.docs.forEach(d => {
            // tasks.push(d.data())
          // })
        // })
        // project.tasks = tasks;
        // projects.push(project);
      // })
      // console.log('inside: ', projects);
      // return projects;
    // });
    // return projects;
  // }
  // function fetchingData(projects){
    // return (Promise.resolve(projects));
  // }