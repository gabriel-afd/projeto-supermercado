const User = require('../models/User');

exports.listarUsuarios = async (req, res) => {
  try {
    const users = await User.find().select('-senha');
    res.json({ users });
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({ error: 'Erro ao listar usuários' });
  }
};

exports.buscarUsuario = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-senha');
    
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
};

exports.atualizarUsuario = async (req, res) => {
  try {
    const { nome, email, cpf, preferencias } = req.body;
    
    if (req.params.id !== req.userId.toString()) {
      return res.status(403).json({ error: 'Você não pode atualizar dados de outro usuário' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { nome, email, cpf, preferencias },
      { new: true, runValidators: true }
    ).select('-senha');

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json({ 
      message: 'Usuário atualizado com sucesso',
      user 
    });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
};


exports.deletarUsuario = async (req, res) => {
  try {

    if (req.params.id !== req.userId.toString()) {
      return res.status(403).json({ error: 'Você não pode deletar outro usuário' });
    }

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
};