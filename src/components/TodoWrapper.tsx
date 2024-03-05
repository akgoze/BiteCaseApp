import React, {useEffect, useState} from 'react'
import TodoForm from './TodoForm'
import EditTodoForm from './EditTodoForm'
import Todo from './Todo'
import TodoItem from "../model";
import axios from 'axios';


export const TodoWrapper: React.FC = () => {

  const [todos, setTodos] = useState<TodoItem[]>([])

  useEffect(() => {
    const fecthTodos = async () => {
      try {
        const respone = await axios.get(process.env.REACT_APP_ENDPOINT_URL as string);
        setTodos(respone.data)
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fecthTodos()}, [])

  const addTodo = (todoItem: TodoItem) => {
    
    setTodos([...todos, todoItem])
  }

  const handleToggle = (id: string) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    }))
  }

  const handleEdit = (task:string, id: string) => {
    setTodos(todos.map(todo => todo.id === id ? {...todo, task, isEditing: false} : todo))
  }

  const toggleEdit = (id: string) => {
    setTodos(todos.map(todo => todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo))
  }

  const handleDelete = async (id: string) => {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_ENDPOINT_URL}/${id}`);
        console.log('Todo deleted successfully:', response.data);
        // You may want to update your local state or UI after successful deletion
    } catch (error) {
        console.error('Error deleting todo:', error);
    }

    setTodos(
      todos.map(
        todo => todo?.id === id 
          ? {...todo, isEditing: false} 
          : todo).filter(todo => todo?.id
                      ? todo.id !== id
                      : false
      )
    )
    
  }

  return (
    <div className='TodoWrapper'>
      <h1>Todo App</h1>
      
      <TodoForm addTodo={addTodo} />
      
        {todos.map((todo: TodoItem, index:number) => (
          todo?.isEditing ?
          <EditTodoForm
          todo={todo}
          editTodo={handleEdit}
          /> :
          <Todo
            key={`task_item_${index}`} 
            task={todo} 
            editTask={toggleEdit}
            toggleTask={handleToggle}
            deleteTask={handleDelete} />
        ))}
    </div>
  )
}

