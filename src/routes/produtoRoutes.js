const express = require('express');
const path = require('path');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

router.get('/cadastrar_produto', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/html/cadastro_produto.html'))
});

router.get('/listar', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/html/lista_produtos.html'))
});

router.post('/produto/cadastrar_produto', produtoController.cadastrarProduto);

router.get('/produtos', produtoController.listarProdutos);

router.delete('/produto/:id', produtoController.excluirProduto);

router.put('/produto/:id', produtoController.editarProduto);

module.exports = router;
