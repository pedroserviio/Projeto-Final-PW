const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/cadastrar_usuario', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/html/cadastro_usuario.html'))
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/html/login.html'))
});

module.exports = router;