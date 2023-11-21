/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import React from 'react'
import { toast } from 'react-toastify'

function ToDoCreate({ handleSubmitAddTodo, title, setTitle }) {

  return (
    <form
      onSubmit={handleSubmitAddTodo}
      className="flex items-center gap-4 px-4 py-4 overflow-hidden transition-all duration-1000 bg-white rounded-md dark:bg-gray-800"
    >
      <span className="inline-block w-5 h-5 border-2 rounded-full"></span>
      <input
        type="text"
        placeholder="Create a new todo..."
        className="w-full text-gray-400 transition-all duration-1000 outline-none dark:bg-gray-800"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit"
        className="flex items-center justify-center w-12 h-8 transition-all duration-1000 bg-blue-500 rounded-full hover:bg-blue-700"
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
