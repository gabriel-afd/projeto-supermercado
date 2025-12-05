import ProductCard from './ProductCard';

const ProductList = ({ titulo, produtos }) => {
  if (!produtos || produtos.length === 0) return null;

  return (
    <section className="product-section">
      <h2>{titulo}</h2>
      <div className="product-grid">
        {produtos.map((p) => (
          <ProductCard key={p._id} produto={p} />
        ))}
      </div>
    </section>
  );
};

export default ProductList;
