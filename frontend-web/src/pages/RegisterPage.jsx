import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Loading from '../components/Loading';

const tiposPreferencia = [
  'carnes',
  'frutas',
  'verduras',
  'laticínios',
  'bebidas',
  'limpeza',
  'higiene',
  'outros'
];

const RegisterPage = () => {
  const { user, register, authLoading, error, setError } = useAuth();
  const [form, setForm] = useState({
    nome: '',
    email: '',
    cpf: '',
    senha: '',
    preferencias: []
  });
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((old) => ({ ...old, [name]: value }));
  };

  const togglePreferencia = (tipo) => {
    setForm((old) => {
      const jaTem = old.preferencias.includes(tipo);
      return {
        ...old,
        preferencias: jaTem
          ? old.preferencias.filter((t) => t !== tipo)
          : [...old.preferencias, tipo]
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await register(form);
    if (ok) {
      alert('Conta criada com sucesso! Faça login.');
      navigate('/login');
    }
  };

  return (
    <div className="page-container">
      <div className="auth-card">
        <h1>Criar conta</h1>

        {authLoading && <Loading message="Criando conta..." />}

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
            Nome
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            CPF
            <input
              type="text"
              name="cpf"
              value={form.cpf}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Senha
            <input
              type="password"
              name="senha"
              value={form.senha}
              onChange={handleChange}
              required
              minLength={6}
            />
          </label>

          <fieldset className="preferencias-fieldset">
            <legend>Preferências de produtos</legend>
            <div className="preferencias-grid">
              {tiposPreferencia.map((tipo) => (
                <label key={tipo} className="pref-item">
                  <input
                    type="checkbox"
                    checked={form.preferencias.includes(tipo)}
                    onChange={() => togglePreferencia(tipo)}
                  />
                  {tipo}
                </label>
              ))}
            </div>
          </fieldset>

          <button type="submit" className="btn btn-primary" disabled={authLoading}>
            Criar conta
          </button>
        </form>

        <p className="auth-link">
          Já tem conta? <a href="/login">Entrar</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
