const express = require('express');
const path = require('path');
const router = express.Router();

// Rota principal (página inicial)
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/index.html'))
});

// Rota de login
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/login.html'))
});

module.exports = router;
