import React, { useState } from 'react';
import TodoItem from "./../models/ToDo";
interface TodoFormProps {
  addTodo: (todoItem: TodoItem) => void;
}


const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [text, setText] = useState('');
  return (
  );
};

export default TodoForm;