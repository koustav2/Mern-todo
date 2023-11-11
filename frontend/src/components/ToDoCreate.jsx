/* eslint-disable no-unused-vars */
import axios from 'axios'
import React from 'react'

function ToDoCreate() {
  const [title, setTitle] = React.useState('')
  const handleSubmitAddTodo = async () => {
    await axios.post('http://localhost:8000/api/todo/postTodos', {
      title
    })
    setTitle('')
  }
  return (
    <form
      onSubmit={handleSubmitAddTodo}
      className="flex items-center gap-4 overflow-hidden rounded-md bg-white py-4 px-4 dark:bg-gray-800 transition-all duration-1000"
    >
      <span className="inline-block w-5 h-5 rounded-full border-2"></span>
      <input
        type="text"
        placeholder="Create a new todo..."
        className="w-full text-gray-400 outline-none dark:bg-gray-800 transition-all duration-1000"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit"
        className="flex items-center justify-center w-12 h-8 rounded-full bg-blue-500 hover:bg-blue-700 transition-all duration-1000"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
          <path
            fill="none"
            stroke="#FFF"
            strokeWidth="3"
            d="M1 9h16M9 1l8 8-8 8"
          />
        </svg>
      </button>
    </form>
  )
}

export default ToDoCreate
