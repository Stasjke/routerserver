import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import todoService from "./services/todoService";
import debounce from "lodash.debounce";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import LinkListTodo from "./pages/LinkListTodo";

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
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const updateTodo = async (id, newText) => {
    try {
      await todoService.updateTodo(id, { text: newText });
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
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
    <>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                todos={todos}
                sortByAlpha={sortByAlpha}
                toggleSort={toggleSort}
                debouncedSearch={debouncedSearch}
                addTodo={addTodo}
                getFilteredTodos={getFilteredTodos}
              />
            }
          />
          <Route
            path="task/:id"
            element={
              <LinkListTodo
                todos={todos}
                onDelete={deleteTodo}
                onUpdate={updateTodo}
              />
            }
          />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace={true} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
