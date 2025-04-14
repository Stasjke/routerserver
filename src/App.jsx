import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import SearchBar from "./components/SearchBar";
import todoService from "./services/todoService";
import debounce from "lodash.debounce";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortByAlpha, setSortByAlpha] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const data = await todoService.getAllTodos();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (text) => {
    try {
      const newTodo = await todoService.createTodo(text);
      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await todoService.deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const updateTodo = (id, newText) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const debouncedSearch = debounce((term) => {
    setSearchTerm(term);
  }, 300);

  const toggleSort = () => {
    setSortByAlpha(!sortByAlpha);
  };

  const getFilteredTodos = () => {
    let filteredTodos = todos.filter((todo) =>
      todo.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortByAlpha) {
      filteredTodos = [...filteredTodos].sort((a, b) =>
        a.text.localeCompare(b.text)
      );
    }

    return filteredTodos;
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

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

export default App;
