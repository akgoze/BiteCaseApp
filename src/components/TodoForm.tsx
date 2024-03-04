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
    const apiEndpoint = process.env.ENDPOINT || '';

    
    await axios.put(`https://zg312eh1zj.execute-api.eu-central-1.amazonaws.com/todos`, todoItem, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    //  axios.post(apiEndpoint, todoItem).then(() => {
    //   console.log(apiEndpoint)
    //   addTodo(todoItem);
    // })
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