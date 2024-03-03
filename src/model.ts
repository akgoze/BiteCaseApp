interface TodoItem {
  id: string;
  task: string;
  completed: boolean;
  createdAt: Date;
  isEditing: boolean;
}

export default TodoItem;
