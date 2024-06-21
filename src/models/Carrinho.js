const mongoose = require('mongoose');

const carrinhoSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    produtos: [{
        produto: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto', required: true },
        nome: { type: String, required: true },
        quantidade: { type: Number, required: true }
    }]
});

const CarrinhoModel = mongoose.model('Carrinho', carrinhoSchema);

module.exports = CarrinhoModel;
