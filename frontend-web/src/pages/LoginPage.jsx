import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Loading from '../components/Loading';

const LoginPage = () => {
  const { user, login, authLoading, error, setError } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await login(email, senha);
    if (ok) navigate('/');
  };

  return (
    <div className="page-container">
      <div className="auth-card">
        <h1>Entrar</h1>

        {authLoading && <Loading message="Entrando..." />}

        {error && !authLoading && (
          <div className="alert alert-error">
            {error}
            <button className="alert-close" onClick={() => setError(null)}>
              ×
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Senha
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </label>

          <button type="submit" className="btn btn-primary" disabled={authLoading}>
            Entrar
          </button>
        </form>

        <p className="auth-link">
          Ainda não tem conta? <a href="/register">Criar conta</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
