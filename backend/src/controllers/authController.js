const jwt = require('jsonwebtoken');
const User = require('../models/User');

const gerarToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

exports.registro = async (req, res) => {
  try {
    const { nome, email, senha, cpf, preferencias } = req.body;

    const existente = await User.findOne({
      $or: [{ email }, { cpf }]
    });

    if (existente) {
      return res
        .status(400)
        .json({ error: 'Já existe um usuário com este email ou CPF.' });
    }

    const novoUser = new User({
      nome,
      email,
      senha,
      cpf,
      preferencias
    });

    await novoUser.save();

    res.status(201).json({
      message: 'Usuário criado com sucesso',
      user: novoUser.toJSON()
    });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ error: 'Erro ao registrar usuário.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'Email ou senha inválidos.' });
    }

    const senhaValida = await user.compararSenha(senha);

    if (!senhaValida) {
      return res.status(400).json({ error: 'Email ou senha inválidos.' });
    }

    const token = gerarToken(user._id);

    res.json({
      message: 'Login realizado com sucesso',
      token,
      user: user.toJSON()
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro ao realizar login.' });
  }
};


exports.verificarToken2FA = async (req, res) => {
  try {
    const { codigo } = req.body;

    if (codigo !== '123456') {
      return res.status(400).json({ error: 'Código 2FA inválido.' });
    }

    res.json({ message: '2FA verificado com sucesso.' });
  } catch (error) {
    console.error('Erro ao verificar 2FA:', error);
    res.status(500).json({ error: 'Erro ao verificar 2FA.' });
  }
};

exports.me = async (req, res) => {
  try {
    
    if (!req.user) {
      return res.status(401).json({ error: 'Não autenticado.' });
    }

    res.json({ user: req.user.toJSON() });
  } catch (error) {
    console.error('Erro ao buscar usuário logado:', error);
    res.status(500).json({ error: 'Erro interno.' });
  }
};
