import React, {useState, useEffect} from 'react';
import { Todo } from './todo.model'
import Items from './components/Items';
import { RouterConfig } from "./router/RouterConfig";
import {BrowserRouter as Router, Route, Link} from "react-router-dom"


const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const todoAddHandler = (text: string) => {
    setTodos(prevTodos => [...prevTodos, {id: Math.random().toString(), text: text}])
  }
  const todoDeleteHandler = (todoId: string) =>{
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId))
  }
  return (
    <div className="App">
      <RouterConfig />
      <Items/>
    </div>
  );
}

export default App;