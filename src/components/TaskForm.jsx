import { useState } from "react"

export const TaskForm = ({onAdd}) => {
  const [taskName, setTaskName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onAdd(taskName)
    setTaskName('')
  }

  const taskHandle = (event) => {
    setTaskName(event.target.value)
  }
  return (
    <>
        <form onSubmit={handleSubmit}>
            <button>+</button>
            <input
              type="text"
              value={taskName}
              onChange={taskHandle}
              placeholder="Your next task..." />
        </form>
    </>
  )
}
