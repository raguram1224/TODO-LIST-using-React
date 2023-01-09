import { useState } from 'react';

import AddTaskForm from './components/AddTaskForm.jsx';
import UpdateForm from './components/UpdateForm.jsx';
import ToDo from './components/ToDo.jsx';



import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

function App() {

  //Tasks ToDo List(Tasks)
  const [toDo, setToDo] = useState([]);

  //Temp State
  const [newTask, setNewTask] = useState(' ');
  const [UpdateData, setUpdateData] = useState('');

  //Add Task

  const addTask = () => {
    if (newTask) {
      let num = toDo.length + 1;
      let newEntry = { id: num, title: newTask, status: false }
      setToDo([...toDo, newEntry])
      setNewTask(' ');
    }
  }


  //Delete Task

  const deleteTask = (id) => {
    let newTasks = toDo.filter(task => task.id !== id)
    setToDo(newTasks);
  }

  //marktask as done or completed

  const markDone = (id) => {
    let newTask = toDo.map(task => {
      if (task.id === id) {
        return ({ ...task, status: !task.status })
      }
      return task;
    })
    setToDo(newTask)
  }

  //cancelupdate

  const cancelUpdate = () => {
    setUpdateData(' ');
  }

  //change task for update

  const changeTask = (e) => {
    let newEntry = {
      id: UpdateData.id,
      title: e.target.value,
      status: UpdateData.status ? true : false
    }
    setUpdateData(newEntry);
  }

  //update task
  const updateTask = () => {
    let filterRecords = [...toDo].filter(task => task.id !== UpdateData.id);
    let updatedObject = [...filterRecords, UpdateData]
    setToDo(updatedObject);
    setUpdateData(' ');
  }

  return (
    <div className="container App">
      <br /> <br />

      <h2>Build TODO LIST using REACT JS</h2>
      <br /> <br />


      {/*Update Task */}
      {UpdateData && UpdateData ? (
        <UpdateForm

          UpdateData={UpdateData}
          updateTask={updateTask}
          cancelUpdate={cancelUpdate}
          changeTask={changeTask}
        />
      ) : (

        <AddTaskForm
          newTask={newTask}
          setNewTask={setNewTask}
          addTask={addTask}

        />
      )}



      {/* Display ToDos */}
      {toDo && toDo.length ? ' ' : 'No Tasks...'}

      <ToDo
        toDo={toDo}
        markDone={markDone}
        setUpdateData={setUpdateData}
        deleteTask={deleteTask}
      />
    </div >
  );
}

export default App;
