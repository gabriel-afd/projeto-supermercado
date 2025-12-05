import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="page-container">
      <h1>404</h1>
      <p>Página não encontrada.</p>
      <Link to="/" className="btn btn-primary">
        Voltar para a home
      </Link>
    </div>
  );
};

export default NotFoundPage;
