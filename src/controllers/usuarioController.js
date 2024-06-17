const Usuario = require('../models/Usuario');

async function cadastrarUsuario(req, res) {
    try {
        console.log(req.body);
        const usuario = new Usuario({
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha
        });

        await usuario.save();
        req.session.message = 'Cadastro realizado com sucesso! Faça login para continuar.';
        res.redirect('/login');
    } catch (error) {
        console.log('Erro: ', error);
        res.status(500).send({ error: 'Erro ao cadastrar usuário' });
    }
}

async function autenticarUsuario (req, res) {
    const { email, senha } = req.body;

    try {
        const usuario = await Usuario.findOne({ email, senha });

        if (usuario) {
            req.session.autorizado = true;
            req.session.usuario = usuario.email;
            req.session.successMessage = 'Login realizado com sucesso!';
            console.log(req.session);
            res.status(200).redirect('/');
        } else {
            res.status(401).json({ message: 'Usuário ou senha incorretos' });
        }
    } catch (error) {
        console.log('Erro: ', error);
        res.status(500).send({ error: 'Erro ao autenticar usuário' });
    }
}

function sair(req, res) {
    req.session.destroy();
    res.redirect('/');
}

module.exports = { cadastrarUsuario, autenticarUsuario, sair };
