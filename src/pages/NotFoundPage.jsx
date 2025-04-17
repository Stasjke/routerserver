import { Link, useLocation } from "react-router-dom";

function NotFoundPage() {
  const location = useLocation();
  const message = location.state?.message || "Страница не найдена";

  return (
    <div>
      <h1>Ошибка 404</h1>
      <p>{message}</p>
      <p>
        Вернитесь на <Link to="/">главную страницу</Link>.
      </p>
    </div>
  );
}

export default NotFoundPage;
