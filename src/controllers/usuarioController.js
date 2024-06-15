const Usuario = require('../models/Usuario');

async function cadastrar_usuario(req, res) {
    try {
        console.log(req.body);
        const usuario = new Usuario({
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha
        });

        await usuario.save();
        req.session.message = 'Cadastro realizado com sucesso! Faça login para continuar.';
        res.redirect('/login'); // Redireciona para a página de login após o cadastro
    } catch (error) {
        console.log('Erro: ', error);
        res.status(500).send({ error: 'Erro ao cadastrar usuário' });
    }
}

module.exports = { cadastrar_usuario };
