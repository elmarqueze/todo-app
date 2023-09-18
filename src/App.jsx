import { useEffect, useState } from 'react'
import './App.css'
import { Task } from './components/Task'
import { TaskForm } from './components/TaskForm'

function App() {

  const [tasks, setTasks] = useState([]);

  useEffect( () => {
    if(tasks.length === 0) return;
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks]);
  
  useEffect( () => {
    const tasks = JSON.parse(localStorage.getItem('tasks'))
    setTasks(tasks || []);
  }, [])

  const addTask = (name) => {
    setTasks( prev => {
      return [...prev, {name: name, done: false}]
    })
  }

  const removeTask = (indexToRemove) => {
    setTasks(prev => {
      return prev.filter((taskObject, index) => index !== indexToRemove);
    });
  }

  const updateTaskDone = (taskIndex, newDone) => {
    setTasks( prev => {
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone;
      return newTasks;
    })
  }

  const numberComplete = tasks.filter(t => t.done).length;
  const numberTotal = tasks.length;

  const getMessage = () => {
    const percentage = numberComplete/numberTotal * 100;
    if(percentage === 0){
      return 'Try to do at least one! 🙏';
    } else if (percentage === 100) {
      return 'Nice job for today! 🥳'
    }
    return 'Keep it going 💪'
  }

  const renameTask = (index, newName) => {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[index].name = newName
      return newTasks;
    })
  }

  return (
    <main>
      <h1>{numberComplete}/{numberTotal} Complete</h1>
      <h2>{getMessage()}</h2>
      <TaskForm onAdd={addTask} />
      {tasks.map( (task, index) => (
        <Task {...task}
          onRename={newName => renameTask(index, newName)}
          onTrash={() => removeTask(index)}
          onToggle={done => updateTaskDone(index, done) } />  
      ))}
    </main>
  )
}

export default App
