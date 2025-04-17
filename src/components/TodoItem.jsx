import { Link } from "react-router-dom";
import "./TodoItem.css";
import todoService from "../services/todoService";

function TodoItem({ todo }) {
  return (
    <li key={todo.id} className="todo-item-main">
      <Link to={`/task/${todo.id}`} className="no-link-style">
        {todoService.titleLength(todo.text)}
      </Link>
    </li>
  );
}

export default TodoItem;
