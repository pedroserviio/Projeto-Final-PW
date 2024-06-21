const CarrinhoModel = require('../models/Carrinho');
const PedidoModel = require('../models/Pedido');
const ProdutoModel = require('../models/Produto');

const criarPedido = async (req, res) => {
    const usuarioId = req.session.usuario.id;

    try {
        const carrinho = await CarrinhoModel.findOne({ usuario: usuarioId });

        if (!carrinho) {
            return res.status(404).json({ message: 'Carrinho não encontrado' });
        }

        let total = 0;

        for (const item of carrinho.produtos) {
            const produto = await ProdutoModel.findById(item.produto);
            total += produto.preco * item.quantidade;
        }

        const pedido = new PedidoModel({
            usuario: usuarioId,
            produtos: carrinho.produtos,
            total
        });

        await pedido.save();
        await CarrinhoModel.findByIdAndDelete(carrinho._id);

        res.status(200).json(pedido);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { criarPedido };
