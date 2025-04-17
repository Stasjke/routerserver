import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LinkListTodo from "./pages/LinkListTodo";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="task/:id" element={<LinkListTodo />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace={true} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
