const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    produtos: [{
        produto: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto', required: true },
        nome: { type: String, required: true },
        quantidade: { type: Number, required: true }
    }],
    total: { type: Number, required: true },
    data: { type: Date, default: Date.now }
});

const PedidoModel = mongoose.model('Pedido', pedidoSchema);

module.exports = PedidoModel;
