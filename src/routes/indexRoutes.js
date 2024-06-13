const express = require('express');
const path = require('path');
const router = express.Router();

// Rota principal (página inicial)
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/html/index.html'))
});

module.exports = router;
