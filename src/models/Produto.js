const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    preco: { type: Number, required: true },
    descricao: { type: String }
});

const ProdutoModel = mongoose.model('Produto', produtoSchema);

module.exports = ProdutoModel;
