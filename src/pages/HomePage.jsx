import TodoForm from "../components/TodoForm";
import SearchBar from "../components/SearchBar";
import TodoList from "../components/TodoList";

function HomePage({
  updateTodo,
  deleteTodo,
  addTodo,
  debouncedSearch,
  toggleSort,
  sortByAlpha,
  getFilteredTodos,
}) {
  return (
    <div className="app">
      <h1>Список дел</h1>
      <TodoForm onAdd={addTodo} />
      <SearchBar onSearch={debouncedSearch} />
      <button onClick={toggleSort}>
        Сортировка: {sortByAlpha ? "вкл" : "выкл"}
      </button>
      <TodoList
        todos={getFilteredTodos()}
        onDelete={deleteTodo}
        onUpdate={updateTodo}
      />
    </div>
  );
}

export default HomePage;
