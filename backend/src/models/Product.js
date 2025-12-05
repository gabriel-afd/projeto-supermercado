const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Nome do produto é obrigatório'],
    trim: true
  },
  preco: {
    type: Number,
    required: [true, 'Preço é obrigatório'],
    min: [0, 'Preço não pode ser negativo']
  },
  tipo: {
    type: String,
    required: [true, 'Tipo é obrigatório'],
    enum: ['carnes', 'frutas', 'verduras', 'laticínios', 'bebidas', 'limpeza', 'higiene', 'outros']
  },
  descricao: {
    type: String,
    required: [true, 'Descrição é obrigatória']
  },
  dataValidade: {
    type: Date,
    required: [true, 'Data de validade é obrigatória']
  },
  emPromocao: {
    type: Boolean,
    default: false
  },
  precoPromocional: {
    type: Number,
    min: [0, 'Preço promocional não pode ser negativo']
  },
  desconto: {
    type: Number,
    min: 0,
    max: 100
  },
  imagem: {
    type: String,
    default: 'https://via.placeholder.com/200x200/4CAF50/ffffff?text=Produto'
  },
  estoque: {
    type: Number,
    default: 0,
    min: 0
  },
  criadoEm: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

productSchema.pre('save', function(next) {
  if (this.emPromocao && this.precoPromocional && this.preco > 0) {
    this.desconto = Math.round(((this.preco - this.precoPromocional) / this.preco) * 100);
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);