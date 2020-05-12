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
const projectsCollection = db.collection('projects');

function getProjects() {
  return new Promise(function (resolve) {
    const projectsCollection = db.collection('projects');
    const projects = [];
    projectsCollection.get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        const projectId = doc.id;
        const tasks = [];
        const project = {
          id: projectId,
          name: doc.data().name,
        }
        projectsCollection.doc(projectId).collection('tasks').get().then((s) => {
          s.docs.forEach(d => {
            tasks.push({
              id: d.id,
              name: d.data().name, 
              done: d.data().done
            })
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
  return (new Promise(function (resolve) {
    const projectsCollection = db.collection('projects');
    projectsCollection.add({
      name: project.name,
    }).then(function (newDoc) {
      resolve(newDoc.id)
    })
  }))
}

function saveTasks(project, task) {
  return new Promise(function (resolve) {
    projectsCollection.doc(project.id).collection('tasks').add(
      { name: task.name }
    ).then(function (task) {
      resolve(task.id)
    })
  })
}
function deleteTask(projectId, taskId){
  projectsCollection
    .doc(projectId).collection('tasks').doc(taskId).delete();
}
function deleteProject(projectId){
  projectsCollection.doc(projectId).delete();
}

export { getProjects, saveProjects, saveTasks, deleteTask, deleteProject};




