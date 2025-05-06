import { useState } from 'react'
import './App.css';
import { Routes, Route } from 'react-router-dom';
import TodoList from './components/TodoList.jsx';
import TodoDetails from './components/TodoDetails.jsx';
import TodoForm from './components/TodoForm.jsx';

function App() {

  return (
    <Routes>
      <Route path="/" element={<TodoList />} />
      <Route path="/todo/:id" element={<TodoDetails />} />
      <Route path="/add" element={<TodoForm mode="add" />} />
      <Route path="/edit/:id" element={<TodoForm mode="edit" />} />
    </Routes>
  )
}

export default App
