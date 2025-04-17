import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div>
      <h1>Ошибка 404</h1>
      <p>
        Страница не найдена. Вернитесь на <Link to="/">главную страницу</Link>.
      </p>
    </div>
  );
}

export default NotFoundPage;
