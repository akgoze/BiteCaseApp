import React, {useState} from 'react'
import TodoForm from './TodoForm'
import EditTodoForm from './EditTodoForm'
import Todo from './Todo'
import TodoItem from "./../models/ToDo";


export const TodoWrapper: React.FC = () => {

  const [todos, setTodos] = useState<TodoItem[]>([])

  const addTodo = (todoItem: TodoItem) => {
    
    setTodos([...todos, todoItem])
  }

  return (
    <div className='TodoWrapper'>
      <h1>Todo App</h1>
      
      <TodoForm addTodo={addTodo} />
      
}