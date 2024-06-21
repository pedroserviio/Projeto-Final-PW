const express = require('express');
const path = require('path');
const carrinhoController = require('../controllers/carrinhoController');

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/html/carrinho.html'));
});

router.post('/adicionar', carrinhoController.adicionarAoCarrinho);
router.post('/remover', carrinhoController.removerDoCarrinho);
router.get('/itens', carrinhoController.obterItensCarrinho);

module.exports = router;
