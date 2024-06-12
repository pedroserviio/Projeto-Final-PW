const express = require('express');
const path = require('path');
const router = express.Router();

// Rota principal (página inicial)
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/index.html'))
});

router.get('/cadastrar_produto', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/cadastro_produto.html'))
});

router.get('/listar', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/lista_produtos.html'))
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/login.html'))
});


module.exports = router;
