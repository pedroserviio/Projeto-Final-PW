const express = require('express');
const { criarPedido } = require('../controllers/pedidoController');

const router = express.Router();

router.post('/criar', criarPedido);

module.exports = router;
