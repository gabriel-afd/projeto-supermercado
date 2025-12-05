const Product = require('../models/Product');

exports.criarProduto = async (req, res) => {
  try {
    const produto = new Product(req.body);
    await produto.save();

    res.status(201).json({
      message: 'Produto criado com sucesso',
      produto
    });
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
};

exports.listarProdutos = async (req, res) => {
  try {
    const { tipo, emPromocao } = req.query;
    let filtro = {};

    if (tipo) {
      filtro.tipo = tipo;
    }

    if (emPromocao === 'true') {
      filtro.emPromocao = true;
    }

    const produtos = await Product.find(filtro).sort({ criadoEm: -1 });

    
    if (req.user && req.user.preferencias && req.user.preferencias.length > 0) {
      const produtosRecomendados = produtos.filter(p => 
        req.user.preferencias.includes(p.tipo)
      );
      const outrosProdutos = produtos.filter(p => 
        !req.user.preferencias.includes(p.tipo)
      );

      return res.json({
        total: produtos.length,
        recomendados: produtosRecomendados,
        outros: outrosProdutos
      });
    }

    res.json({
      total: produtos.length,
      produtos
    });
  } catch (error) {
    console.error('Erro ao listar produtos:', error);
    res.status(500).json({ error: 'Erro ao listar produtos' });
  }
};

exports.buscarProduto = async (req, res) => {
  try {
    const produto = await Product.findById(req.params.id);

    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.json({ produto });
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    res.status(500).json({ error: 'Erro ao buscar produto' });
  }
};

exports.atualizarProduto = async (req, res) => {
  try {
    const produto = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.json({
      message: 'Produto atualizado com sucesso',
      produto
    });
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
};

exports.deletarProduto = async (req, res) => {
  try {
    const produto = await Product.findByIdAndDelete(req.params.id);

    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.json({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    res.status(500).json({ error: 'Erro ao deletar produto' });
  }
};

exports.promocoes = async (req, res) => {
  try {
    const produtos = await Product.find({ emPromocao: true }).sort({ desconto: -1 });

    res.json({
      total: produtos.length,
      produtos
    });
  } catch (error) {
    console.error('Erro ao buscar promoções:', error);
    res.status(500).json({ error: 'Erro ao buscar promoções' });
  }
};