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

  const handleDelete = (id: string) => {
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