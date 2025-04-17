import { useState, useEffect } from "react";
import TodoForm from "../components/TodoForm";
import SearchBar from "../components/SearchBar";
import TodoList from "../components/TodoList";
import todoService from "../services/todoService";
import "./HomePage.css";

function HomePage() {
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

  const updateTodo = async (id, newText) => {
    try {
      await todoService.updateTodo(id, newText);
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, text: newText } : todo
        )
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const debouncedSearch = (term) => {
    setSearchTerm(term);
  };

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
    <div className="home-page">
      <h1>Список дел</h1>
      <TodoForm onAdd={addTodo} />
      <SearchBar onSearch={handleSearch} />
      <button className="toggle-sort-button" onClick={toggleSort}>
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
