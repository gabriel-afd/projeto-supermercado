import React, { createContext, useEffect, useState } from 'react';
import api from '../api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);      
  const [loading, setLoading] = useState(true); 
  const [authLoading, setAuthLoading] = useState(false); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setLoading(false);
      return;
    }

    const fetchMe = async () => {
      try {
        const res = await api.get('/api/auth/me');
        setUser(res.data.user || res.data);
      } catch (err) {
        console.error('Erro ao buscar usuário logado', err);
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, []);

  const login = async (email, senha) => {
    try {
      setAuthLoading(true);
      setError(null);

      const res = await api.post('/api/auth/login', { email, senha });

      const { token, user } = res.data;
      localStorage.setItem('token', token);
      setUser(user);

      return true;
    } catch (err) {
      console.error('Erro no login', err);
      setError(
        err.response?.data?.error || 'Não foi possível fazer login. Tente novamente.'
      );
      return false;
    } finally {
      setAuthLoading(false);
    }
  };

  const register = async (dados) => {
    try {
      setAuthLoading(true);
      setError(null);
      await api.post('/api/auth/registro', dados);
      return true;
    } catch (err) {
      console.error('Erro no registro', err);
      setError(
        err.response?.data?.error ||
          'Não foi possível criar sua conta. Verifique os dados.'
      );
      return false;
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    loading,
    authLoading,
    error,
    login,
    register,
    logout,
    setError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
