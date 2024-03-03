import React from 'react';
import TodoItem from "../model";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

interface TodoItemProps {
  task: TodoItem;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string) => void;
}


const Todo: React.FC<TodoItemProps> = ({ task, toggleTask: toggle, deleteTask, editTask }) => {
  return (
    <div className='Todo'>
      <p onClick={() => toggle(task?.id)} className={`${task.completed && 'completed'}`}>{task.task}</p>
      <FontAwesomeIcon icon={faPenToSquare} onClick={() => editTask(task?.id)} />
      <FontAwesomeIcon icon={faTrash} onClick={() => deleteTask(task?.id)} />
    </div>
  );
};

export default Todo;