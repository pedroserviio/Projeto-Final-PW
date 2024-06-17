const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController');

router.post('/cadastrar_usuario', usuarioController.cadastrarUsuario);
// router.get('/api/usuarios', usuarioController.listarUsuarios);

module.exports = router;