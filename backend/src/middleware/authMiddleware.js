const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
   
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
    }

  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
  
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado.' });
    }

    req.user = user;
    req.userId = decoded.userId;

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Token inválido.' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expirado.' });
    }
    res.status(500).json({ error: 'Erro na autenticação.' });
  }
};

module.exports = authMiddleware;