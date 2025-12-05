import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../hooks/useAuth';
import ProductList from '../components/ProductList';
import Loading from '../components/Loading';

const HomePage = () => {
  const { user, loading } = useAuth();
  const [produtosRecomendados, setProdutosRecomendados] = useState([]);
  const [outrosProdutos, setOutrosProdutos] = useState([]);
  const [carregandoProdutos, setCarregandoProdutos] = useState(true);
  const [erroProdutos, setErroProdutos] = useState(null);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        setCarregandoProdutos(true);
        const res = await api.get('/api/products');

        const data = res.data;

        if (data.recomendados || data.outros) {
          setProdutosRecomendados(data.recomendados || []);
          setOutrosProdutos(data.outros || []);
        } else {
          setProdutosRecomendados([]);
          setOutrosProdutos(data.produtos || []);
        }
      } catch (err) {
        console.error('Erro ao buscar produtos', err);
        setErroProdutos('Não foi possível carregar os produtos.');
      } finally {
        setCarregandoProdutos(false);
      }
    };

    fetchProdutos();
  }, []);

  if (loading) {
    return <Loading message="Carregando usuário..." />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="page-container">
      {carregandoProdutos && <Loading message="Buscando produtos..." />}

      {erroProdutos && (
        <div className="alert alert-error">
          {erroProdutos}
          <button className="alert-close" onClick={() => setErroProdutos(null)}>
            ×
          </button>
        </div>
      )}

      {!carregandoProdutos && !erroProdutos && (
        <>
          <h1 className="page-title">Ofertas do Supermercado</h1>

          {produtosRecomendados.length > 0 && (
            <ProductList
              titulo="Produtos recomendados para você"
              produtos={produtosRecomendados}
            />
          )}

          <ProductList titulo="Todos os produtos" produtos={outrosProdutos} />
        </>
      )}
    </div>
  );
};

export default HomePage;
