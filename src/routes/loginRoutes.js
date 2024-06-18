const express = require('express');
const path = require('path');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController');

router.get('/cadastro_de_usuario', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/html/cadastro_usuario.html'))
});

router.post('/autenticar', usuarioController.autenticarUsuario);

router.get('/logout', usuarioController.sair);

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/html/login.html'))
});

module.exports = router;