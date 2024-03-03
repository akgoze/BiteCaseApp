import React, { useState } from 'react';
import TodoItem from "../model";
import { v4 as uuidv4 } from 'uuid';
uuidv4();

interface EditTodoFormProps {
  todo: TodoItem;
  editTodo: (task: string, id: string) => void;
}

const EditTodoForm: React.FC<EditTodoFormProps> = ({ editTodo, todo }) => {
  const [value, setValue] = useState(todo.task);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    editTodo(value, todo.id);
    setValue('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <form className='TodoForm' onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className='todo-input'
        placeholder="Enter a todo"
      />
      <button className='todo-btn' type="submit">Update Todo</button>
    </form>
  );
};

export default EditTodoForm;