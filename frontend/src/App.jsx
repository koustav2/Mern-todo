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
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/`)
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
      await axios.post(`${import.meta.env.VITE_BACKEND_URI}/postTodos`, {
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
      await axios.delete(`${import.meta.env.VITE_BACKEND_URI}/deleteAll`);
      setTodos([])
    } catch (error) {
      toast.error(error.message);
    }
  };


  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/`)
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
                {themeMode === 'light' ?
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
                    <path
                      fill="#FFF"
                      fillRule="evenodd"
                      d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"
                    />
                  </svg> :
                  // eslint-disable-next-line react/no-unknown-property
                  <svg enableBackground="new 0 0 512 512" width="35" height="35" id="Layer_1" version="1.1" viewBox="0 0 512 512" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M349.852,343.15c-49.875,49.916-131.083,49.916-181,0c-49.916-49.918-49.916-131.125,0-181.021  c13.209-13.187,29.312-23.25,47.832-29.812c5.834-2.042,12.293-0.562,16.625,3.792c4.376,4.375,5.855,10.833,3.793,16.625  c-12.542,35.375-4,73.666,22.25,99.917c26.209,26.228,64.5,34.75,99.916,22.25c5.792-2.062,12.271-0.582,16.625,3.793  c4.376,4.332,5.834,10.812,3.771,16.625C373.143,313.838,363.06,329.941,349.852,343.15z M191.477,184.754  c-37.438,37.438-37.438,98.354,0,135.771c40,40.021,108.125,36.416,143-8.168c-35.959,2.25-71.375-10.729-97.75-37.084  c-26.375-26.354-39.333-61.771-37.084-97.729C196.769,179.796,194.039,182.192,191.477,184.754z" fill="#1D1D1B" /></svg>


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
