import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import { useAuth } from './hooks/useAuth';
import Loading from './components/Loading';

const App = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="app-root">
        <Loading message="Inicializando aplicação..." />
      </div>
    );
  }

  return (
    <div className="app-root">
      <Navbar />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
