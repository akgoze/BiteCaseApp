import React, { useState } from 'react';
import TodoItem from "../model";
import { v4 as uuidv4 } from 'uuid';
import  axios from "axios";
uuidv4();

interface TodoFormProps {
  addTodo: (todoItem: TodoItem) => void;
}


const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      setText('');

      const todoItem: TodoItem = {
        id: uuidv4(),
        task: text,
        completed: false,
        createdAt: new Date(),
        isEditing: false
      };

      await axios.put(process.env.REACT_APP_ENDPOINT_URL as string, todoItem, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log('Response:', response.data);
        addTodo(todoItem)
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <form className='TodoForm' onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        className='todo-input'
        placeholder="Enter a todo"
      />
      <button className='todo-btn' type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;





