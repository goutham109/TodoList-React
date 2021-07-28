import './App.css';

import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { Typography } from "@material-ui/core";

const LOCAL_STORAGE_KEY = "react-todo-list-todos";

function App() {

  const [todos,setTodos] = useState([]);

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storageTodos) {
      setTodos(storageTodos);
    }
  },[]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(todos));
  },[todos]);

  function add(todo) {
    setTodos([...todos,todo])
  }

  function toggleComplete(id) {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed
          };
        }
        return  todo;
      })
    );
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  return (
    <div className="App">
    <Typography style ={{ padding: 16 }} variant ="h1">
      React Todo
    </Typography>
    <TodoForm onAdd={add} />
    <TodoList 
    todos={todos}
    toggleComplete={toggleComplete}
    removeTodo = {removeTodo}  
    />
    </div>
  );
}

export default App;
