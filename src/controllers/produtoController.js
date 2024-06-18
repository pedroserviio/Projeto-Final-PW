const Produto = require('../models/Produto');

async function cadastrarProduto(req, res) {
    try {
        const produto = new Produto({
            nome: req.body.nome,
            preco: req.body.preco,
            descricao: req.body.descricao
        });

        await produto.save();
        res.status(200).redirect('/listar');
    } catch (error) {
        console.log('Erro: ', error);
        res.status(500).send({ error: 'Erro ao cadastrar produto' });
    }
}

async function listarProdutos(req, res) {
    try {
        const produtos = await Produto.find({});
        res.status(200).json(produtos);
    } catch (error) {
        console.log('Erro: ', error);
        res.status(500).send({ error: 'Erro ao listar produtos' });
    }
}

async function excluirProduto(req, res) {
    try {
        await Produto.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: 'Produto excluído com sucesso' });
    } catch (error) {
        console.log('Erro: ', error);
        res.status(500).send({ error: 'Erro ao excluir produto' });
    }
}

async function editarProduto(req, res) {
    try {
        await Produto.findByIdAndUpdate(req.params.id, {
            nome: req.body.nome,
            preco: req.body.preco,
            descricao: req.body.descricao
        });
        res.status(200).send({ message: 'Produto atualizado com sucesso' });
    } catch (error) {
        console.log('Erro: ', error);
        res.status(500).send({ error: 'Erro ao editar produto' });
    }
}

module.exports = { cadastrarProduto, listarProdutos, excluirProduto, editarProduto };
