const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/cadastrar_produto', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/html/cadastro_produto.html'))
});

router.get('/listar', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/html/lista_produtos.html'))
});

module.exports = router;
