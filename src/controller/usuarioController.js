const Usuario = require('../models/Usuario');

async function cadastrar_usuario(req, res) {
    try {
        const usuario = new Usuario ({
            nome: req.body.name,
            email: req.body.email,
            senha: req.body.senha
        });

        await usuario.save();
        res.status(200).send({sucess : 1})
    } catch (error) {
        console.log('Erro: ', error);
    }
}

module.exports = { cadastrar_usuario };