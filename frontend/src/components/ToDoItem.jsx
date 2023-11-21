/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";


const TodoItem = React.forwardRef(
  ({ todo,setTodos, }, ref) => {
    const { _id, title, completed } = todo;


    const removeTodo = async (id) => {
      try {
        await axios.delete(`https://mern-todo-vdft.vercel.app/api/todo/deleteTodo/${id}`);
        setTodos((prev) => prev.filter((todo) => todo._id !== id));
        toast.success("Todo deleted successfully!");
      } catch (error) {
        toast.error(error.message);
      }
    }
    const updateTodo = async (id) => {
      try {
        await axios.put(`https://mern-todo-vdft.vercel.app/api/todo/completed`, {
          id,
        });
        setTodos((prev) =>
          prev.map((todo) =>
            todo._id === id ? { ...todo, completed: !todo.completed } : todo
          )
        );
      } catch (error) {
        toast.error(error.message);
      }
    };
    return (
      <article
        ref={ref}
        className="flex gap-4 transition-all duration-1000 border-b gray-400"
      >
        <button
          className={`h-5 w-5 flex-none rounded-full border-2 ${completed
            ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 justify-center items-center"
            : "inline-block"
            }`}
          onClick={() => updateTodo(_id)}
        >
          {completed &&
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
              <path
                fill="none"
                stroke="#FFF"
                strokeWidth="2"
                d="M1 4.304L3.696 7l6-6"
              />
            </svg>
          } {/* render IconCheck component */}
        </button>
        <p
          className={`grow text-gray-600 dark:text-gray-300 ${completed && "line-through"
            }`}
        >
          {title}
        </p>
        <button className="flex-none" onClick={() => removeTodo(_id)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
            <path
              fill="#494C6B"
              fillRule="evenodd"
              d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
            />
          </svg> {/* render IconCross component */}
        </button>
      </article>
    );
  }
);

TodoItem.displayName = "TodoItem"; // set display name for component

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
  }),
  removeTodo: PropTypes.func,
  updateTodo: PropTypes.func,
};

export default TodoItem;