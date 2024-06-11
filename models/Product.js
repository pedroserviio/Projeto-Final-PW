const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    preco: { type: Number, required: true },
    descricao: { type: String }
});

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;
