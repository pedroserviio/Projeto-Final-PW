const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/cadastrar_usuario', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/cadastro_usuario.html'))
});

module.exports = router;