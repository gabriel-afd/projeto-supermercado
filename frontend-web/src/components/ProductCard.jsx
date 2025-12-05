const ProductCard = ({ produto }) => {
  const emPromocao = produto.emPromocao && produto.precoPromocional;

  const precoFormatado = (valor) =>
    valor?.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

  return (
    <div className={`product-card ${emPromocao ? 'product-card-promo' : ''}`}>
      <img src={produto.imagem} alt={produto.nome} className="product-image" />

      <div className="product-content">
        <h3 className="product-title">{produto.nome}</h3>
        <p className="product-type">{produto.tipo}</p>
        <p className="product-desc">{produto.descricao}</p>

        <div className="product-price-area">
          {emPromocao ? (
            <>
              <span className="product-price-old">{precoFormatado(produto.preco)}</span>
              <span className="product-price-new">
                {precoFormatado(produto.precoPromocional)}
              </span>
              {produto.desconto && (
                <span className="product-discount">-{produto.desconto}%</span>
              )}
            </>
          ) : (
            <span className="product-price">{precoFormatado(produto.preco)}</span>
          )}
        </div>

        <p className="product-validade">
          Validade:{' '}
          {produto.dataValidade
            ? new Date(produto.dataValidade).toLocaleDateString('pt-BR')
            : '—'}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
