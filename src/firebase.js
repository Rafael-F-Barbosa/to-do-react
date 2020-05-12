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

function getProjects() {
  return new Promise(function (resolve) {
    const projectsCollection = db.collection('projects');
    const projects = [];
    projectsCollection.get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        const projectId = doc.id;
        const tasks = [];
        const project = {
          id: doc.data().id,
          name: doc.data().name,
        }
        projectsCollection.doc(projectId).collection('tasks').get().then((s) => {
          s.docs.forEach(d => {
            tasks.push(d.data())
          })
        })
        project.tasks = tasks;
        projects.push(project);
      })
      resolve(projects);
    });
  })
}

function saveProjects(project) {
  const projectsCollection = db.collection('projects');
  projectsCollection.add({
    name: project.name,
    id: project.id
  });
}
function saveTasks(task) {
  const projectsCollection = db.collection('projects');
  projectsCollection.get().then(snapshot => {
    snapshot.docs.forEach(doc => {
      const projectId = doc.id;
      console.log(doc.data());
      console.log(projectsCollection.doc(projectId).collection('tasks'))
    //   .add({
    //     name: task.name, id: task.id }
    //   )
    })
  })
}

export { getProjects, saveProjects, saveTasks };




