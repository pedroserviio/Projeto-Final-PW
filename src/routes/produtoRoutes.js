const express = require('express');
const path = require('path');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

router.get('/cadastro_de_produto', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/html/cadastro_produto.html'))
});

router.get('/lista_de_produtos', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/html/lista_produtos.html'))
});

// CRUD de Produtos
router.post('/produto/cadastrar_produto', produtoController.cadastrarProduto);

router.get('/listar_produtos', produtoController.listarProdutos);

router.delete('/produto/:id', produtoController.excluirProduto);

router.put('/produto/:id', produtoController.editarProduto);

module.exports = router;
