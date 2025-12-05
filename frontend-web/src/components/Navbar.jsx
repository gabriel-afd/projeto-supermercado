import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          🛒 Supermercado
        </Link>
      </div>

      <nav className="navbar-links">
        {user && (
          <NavLink to="/" className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }>
            Produtos
          </NavLink>
        )}
      </nav>

      <div className="navbar-right">
        {user ? (
          <>
            <span className="navbar-user">Olá, {user.nome}</span>
            <button className="btn btn-secondary" onClick={handleLogout}>
              Sair
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="btn btn-outline">
              Entrar
            </NavLink>
            <NavLink to="/register" className="btn btn-primary">
              Criar conta
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
