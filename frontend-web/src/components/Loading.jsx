const Loading = ({ message = 'Carregando...' }) => {
  return (
    <div className="loading-container">
      <div className="spinner" />
      <p>{message}</p>
    </div>
  );
};

export default Loading;
