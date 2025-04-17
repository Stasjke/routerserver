import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import todoService from "../services/todoService";
import "./LinkListTodo.css";

function LinkListTodo({ todos, onDelete, onUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState("");
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    const foundTodo = todos.find((todo) => todo.id === Number(id));
    if (foundTodo) {
      setSelectedTodo(foundTodo);
      setEditText(foundTodo.text);
    } else {
      navigate("/404");
    }
  }, [id, navigate, todos]);

  useEffect(() => {
    if (selectedTodo) {
      setEditText(selectedTodo.text);
    }
  }, [selectedTodo]);

  const handleDelete = async () => {
    try {
      navigate("/");
      await onDelete(Number(id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await todoService.updateTodo(Number(id), { text: editText });
      await onUpdate(Number(id), editText);
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
