import TodoItem from "./TodoItem";
import "./TodoList.css";

function TodoList({ todos, onDelete, onUpdate }) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}

export default TodoList;
