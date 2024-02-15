import React, { useState, useEffect } from 'react';
import { Todo } from './todo.model'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ItemDetail from './components/ItemDetail';
import Items from './components/Items';


const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const todoAddHandler = (text: string) => {
    setTodos(prevTodos => [...prevTodos, { id: Math.random().toString(), text: text }])
  }
  const todoDeleteHandler = (todoId: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId))
  }
  return (
    <Router>
      <div className="App">
        <Link to="/item_index">アイテム一覧</Link>
        <Routes>
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/item_index" element={<Items />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;