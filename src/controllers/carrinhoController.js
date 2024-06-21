const CarrinhoModel = require('../models/Carrinho');
const ProdutoModel = require('../models/Produto');

async function adicionarAoCarrinho(req, res) {
    const { produtoId, quantidade } = req.body;
    const usuarioId = req.session.usuario.id;

    try {
        const produto = await ProdutoModel.findById(produtoId);
        if (!produto) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        const carrinho = await CarrinhoModel.findOne({ usuario: usuarioId });

        if (carrinho) {
            const produtoNoCarrinho = carrinho.produtos.find(p => p.produto.toString() === produtoId);
            if (produtoNoCarrinho) {
                produtoNoCarrinho.quantidade += quantidade;
            } else {
                carrinho.produtos.push({ produto: produtoId, nome: produto.nome, quantidade });
            }
            await carrinho.save();
        } else {
            const novoCarrinho = new CarrinhoModel({
                usuario: usuarioId,
                produtos: [{ produto: produtoId, nome: produto.nome, quantidade }]
            });
            await novoCarrinho.save();
        }

        res.status(200).json({ message: 'Produto adicionado ao carrinho com sucesso' });
    } catch (error) {
        console.error('Erro ao adicionar produto ao carrinho:', error);
        res.status(500).json({ error: 'Erro ao adicionar produto ao carrinho' });
    }
}


const removerDoCarrinho = async (req, res) => {
    const { usuarioId, produtoId } = req.body;

    try {
        const carrinho = await CarrinhoModel.findOne({ usuario: usuarioId });

        if (!carrinho) {
            return res.status(404).json({ message: 'Carrinho não encontrado' });
        }

        carrinho.produtos = carrinho.produtos.filter(p => p.produto.toString() !== produtoId);

        await carrinho.save();
        res.status(200).json(carrinho);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

async function obterItensCarrinho(req, res) {
    const usuarioId = req.session.usuario.id;

    try {
        const carrinho = await CarrinhoModel.findOne({ usuario: usuarioId }).populate('produtos.produto');
        if (!carrinho) {
            return res.status(404).json({ message: 'Carrinho vazio' });
        }

        res.status(200).json(carrinho.produtos);
    } catch (error) {
        console.error('Erro ao obter itens do carrinho:', error);
        res.status(500).json({ error: 'Erro ao obter itens do carrinho' });
    }
}

module.exports = { adicionarAoCarrinho, removerDoCarrinho, obterItensCarrinho };
