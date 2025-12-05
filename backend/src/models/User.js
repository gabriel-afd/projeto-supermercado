const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Email inválido']
  },
  senha: {
    type: String,
    required: [true, 'Senha é obrigatória'],
    minlength: [6, 'Senha deve ter no mínimo 6 caracteres']
  },
  cpf: {
    type: String,
    required: [true, 'CPF é obrigatório'],
    unique: true,
    trim: true
  },
  preferencias: [{
    type: String,
    enum: ['carnes', 'frutas', 'verduras', 'laticínios', 'bebidas', 'limpeza', 'higiene', 'outros']
  }],
  criadoEm: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('senha')) return next();
  this.senha = await bcrypt.hash(this.senha, 10);
  next();
});

userSchema.methods.compararSenha = async function(senhaFornecida) {
  return await bcrypt.compare(senhaFornecida, this.senha);
};

userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.senha;
  return obj;
};

module.exports = mongoose.model('User', userSchema);