const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const successMessage = req.session.successMessage || '';
    req.session.successMessage = '';
    const autorizado = req.session.autorizado || false;

    res.render('index', { successMessage, autorizado });
});

module.exports = router;
