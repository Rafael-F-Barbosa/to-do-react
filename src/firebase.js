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

const dataHandler = (() => {
  const db = firebase.firestore();
  const projectsCollection = db.collection('projects');

  function getProjects() {
    return new Promise(function (resolve, reject) {
      const projects = [];
      let verifyConection = false;
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
                date: d.data().date,
                priority: d.data().priority,
                done: d.data().done,
              })
            })
          })
          verifyConection = true;
          project.tasks = tasks;
          projects.push(project);
        })
        if(verifyConection){
          resolve(projects);
        }else{
          reject('Ocorreu algum erro!')
        }
      })
    })
  }
  function saveProjects(project) {
    return (new Promise(function (resolve) {
      projectsCollection.add({
        name: project.name,
        tasks: [],
      }).then(function (newDoc) {
        resolve(newDoc.id)
      })
    }))
  }

  function saveTasks(project, task) {
    const projectId = project.id;
    return new Promise(function (resolve) {
      projectsCollection.doc(projectId).collection('tasks').add(
        {
          name: task.name,
          date: task.date,
          priority: task.priority,
          done: task.done
        }
      ).then(function (result) {
        resolve({ taskId: result.id, projectId: projectId })
      })
    })
  }
  function deleteTask(projectId, taskId) {
    projectsCollection
      .doc(projectId).collection('tasks').doc(taskId).delete();
  }
  function deleteProject(projectId) {
    projectsCollection.doc(projectId).delete();
  }

  function updateTask(projectId, taskId, task) {
    projectsCollection.doc(projectId).collection('tasks').doc(taskId).update(
      {
        name: task.name,
        date: task.date,
        priority: task.priority,
        done: task.done
      }
    )
  }
  return {
    getProjects,
    saveProjects,
    saveTasks,
    deleteTask,
    deleteProject,
    updateTask,
  }
})();

export default dataHandler;




