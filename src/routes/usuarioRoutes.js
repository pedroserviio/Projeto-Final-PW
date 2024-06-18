const express = require('express');
const path = require('path');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController');

router.post('/cadastrar_usuario', usuarioController.cadastrarUsuario);

router.put('/editar_usuario', usuarioController.editarUsuario);

router.get('/dados_usuario', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/html/editar_usuario.html'));
});

router.get('/dados_usuario_sessao', usuarioController.obterDadosUsuarioSessao);

module.exports = router;