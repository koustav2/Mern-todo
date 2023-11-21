/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import './App.css'
import { ThemeProvider } from './context/theme'
import ToDoCreate from './components/ToDoCreate'
import ToDoDetails from './components/ToDoDetails';
import ToDoItem from './components/ToDoItem';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};


function App() {
  const storedThemeMode = localStorage.getItem('themeMode')
  const [themeMode, setThemeMode] = useState(storedThemeMode || 'light')
  const [filter, setFilter] = useState("all");
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = React.useState('')
  const darkTheme = () => {
    setThemeMode('dark')
  }
  const lightTheme = () => {
    setThemeMode('light')
  }

  const fetchTodos = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/todo')
      setTodos(res.data.todos)
    } catch (error) {
      toast.info('No Todos Available.. please create todos')
    }
  }

  const handleSubmitAddTodo = async (e) => {
    e.preventDefault();
    if (!title) {
      toast.error('Please enter a title');
      return;
    }
    try {
      await axios.post('http://localhost:8000/api/todo/postTodos', {
        title
      });
      setTitle('');
      fetchTodos();

    } catch (error) {
      toast.error('An error occurred while adding the todo');
      console.error(error);
    }
  };

  const changeFilter = (filter) => setFilter(filter);
  const filteredTodos = () => {
    switch (filter) {
      case "all":
        return todos;
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  };
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = reorder(
      todos,
      result.source.index,
      result.destination.index
    );
    setTodos(items);
  };

  useEffect(() => {
    document.querySelector('html').classList.remove('dark', 'light')
    document.querySelector('html').classList.add(themeMode)
    localStorage.setItem('themeMode', themeMode)
  }, [themeMode])


  const clearAll = async () => {
    if (todos.length === 0) return toast.info('No todos to clear')
    try {
      await axios.delete("http://localhost:8000/api/todo/deleteAll");
      setTodos([])
    } catch (error) {
      toast.error(error.message);
    }
  };


  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/todo')
        setTodos(res.data.todos)
      } catch (error) {
        // toast.info('No Todos Available.. please create todos')
      }
    }
    fetchTodos()
  }, [
    todos.length
  ])









  return (
    <>
      <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
        <div
          className="min-h-screen bg-gray-300 bg-[url('./images/bg-mobile-light.jpg')] bg-contain bg-no-repeat transition-all duration-1000
     dark:bg-gray-900 dark:bg-[url('./images/bg-mobile-dark.jpg')] md:bg-[url('./images/bg-desktop-light.jpg')] md:dark:bg-[url('./images/bg-desktop-dark.jpg')]"
        >
          <header className="container px-4 pt-8 mx-auto md:max-w-xl">
            <div className="flex justify-between">
              <h1 className="text-3xl font-semibold uppercase tracking-[0.3em] text-white">
                Todo
              </h1>
              <button onClick={() =>
                themeMode === 'light' ? darkTheme() : lightTheme()
              }>
                {themeMode ?
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
                    <path
                      fill="#FFF"
                      fillRule="evenodd"
                      d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"
                    />
                  </svg> :
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
                    <path
                      fill="#FFF"
                      fillRule="evenodd"
                      d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"
                    />
                  </svg>


                }
              </button>
            </div>
          </header>
          <main className="container px-4 mx-auto mt-8 md:max-w-xl">
            <ToDoCreate handleSubmitAddTodo={handleSubmitAddTodo} title={title} setTitle={setTitle} />
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="todos">
                {(droppableProvided) => (
                  <div
                    ref={droppableProvided.innerRef}
                    {...droppableProvided.droppableProps}
                    className="rounded-t-md bg-white [&>article]:p-4 mt-8 overflow-hidden dark:bg-gray-800 transition-all duration-1000"
                  >
                    {filteredTodos().map((todo, index) => (
                      <Draggable key={todo?._id} index={index} draggableId={`${todo._id}`}>
                        {(draggableProvided) => (
                          <ToDoItem
                            key={todo._id}
                            fetchTodos={fetchTodos}
                            setTodos={setTodos}
                            todo={todo}
                            ref={draggableProvided.innerRef}
                            {...draggableProvided.dragHandleProps}
                            {...draggableProvided.draggableProps}
                          />
                        )}
                      </Draggable>
                    ))}
                    {droppableProvided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <ToDoDetails
              todos={todos}
              setTodos={setTodos}
              clearAll={clearAll}
            />
            <section className="container mx-auto mt-8">
              <div className="flex justify-center gap-4 p-4 transition-all duration-1000 bg-white rounded-md dark:bg-gray-800">
                <button
                  className={`${filter === "all"
                    ? "text-blue-500 hover:text-gray-400"
                    : "text-gray-400 hover:text-blue-500"
                    }`}
                  onClick={() => changeFilter("all")}
                >
                  All
                </button>
                <button
                  className={`${filter === "active"
                    ? "text-blue-500 hover:text-gray-400"
                    : "text-gray-400 hover:text-blue-500"
                    }`}
                  onClick={() => changeFilter("active")}
                >
                  Active
                </button>
                <button
                  className={`${filter === "completed"
                    ? "text-blue-500 hover:text-gray-400"
                    : "text-gray-400 hover:text-blue-500"
                    }`}
                  onClick={() => changeFilter("completed")}
                >
                  Completed
                </button>
              </div>
            </section>

          </main>

          <footer className="mt-8 text-center dark:text-gray-400">
            Drag and drop to reorder list
          </footer>
        </div>

      </ThemeProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App
