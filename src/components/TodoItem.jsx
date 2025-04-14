import React, { useState } from "react";
import todoService from "../services/todoService";
import "./TodoItem.css";

function TodoItem({ todo, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleDelete = () => {
    onDelete(todo.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await todoService.updateTodo(todo.id, { ...todo, text: editText });
      onUpdate(todo.id, editText);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  return (
    <li className="todo-item">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button onClick={handleSave}>Сохранить</button>
          <button onClick={handleCancel}>Отмена</button>
        </>
      ) : (
        <>
          <span>{todo.text}</span>
          <div>
            <button onClick={handleEdit}>Редактировать</button>
            <button onClick={handleDelete}>Удалить</button>
          </div>
        </>
      )}
    </li>
  );
}

export default TodoItem;
