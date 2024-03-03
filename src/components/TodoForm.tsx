import React, { useState } from 'react';
import TodoItem from "./../models/ToDo";
import { v4 as uuidv4 } from 'uuid';
uuidv4();

interface TodoFormProps {
  addTodo: (todoItem: TodoItem) => void;
}


const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
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

      addTodo(todoItem);
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