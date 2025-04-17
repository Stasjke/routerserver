import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import todoService from "../services/todoService";
import "./LinkListTodo.css";

function LinkListTodo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState("");
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodo();
  }, [id]);

  const fetchTodo = async () => {
    setLoading(true);
    try {
      const todo = await todoService.getTodo(id);
      setSelectedTodo(todo);
      setEditText(todo.text);
    } catch (error) {
      console.error("Error fetching todo:", error);
      navigate("/404");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await todoService.deleteTodo(id);
      navigate("/");
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await todoService.updateTodo(id, { text: editText });
      setIsEditing(false);
      navigate("/");
    } catch (error) {
      console.error("Ошибка загрузки", error);
    }
  };

  const handleCancel = () => {
    setEditText(selectedTodo.text);
    setIsEditing(false);
  };

  const goHomePage = () => {
    navigate("/");
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (!selectedTodo) {
    return null;
  }

  return (
    <div className="todo-item">
      {isEditing ? (
        <>
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button onClick={handleSave} className="button-save">
            Сохранить
          </button>
          <button onClick={handleCancel} className="button-cancel">
            Отмена
          </button>
        </>
      ) : (
        <>
          <h2>{selectedTodo.text}</h2>
          <div>
            <button onClick={handleEdit}>Редактировать</button>
            <button onClick={handleDelete} className="button-delete">
              Удалить
            </button>
          </div>
        </>
      )}

      <button onClick={goHomePage}>Назад</button>
    </div>
  );
}

export default LinkListTodo;
