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
            req.session.usuario = {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            };
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

async function editarUsuario(req, res) {
    try {
        const userId = req.session.usuario.id;  // Pegando o ID do usuário da sessão
        const { nome, email, senha } = req.body;

        const usuario = await Usuario.findById(userId);

        if (!usuario) {
            return res.status(404).send({ error: 'Usuário não encontrado' });
        }

        if (nome) usuario.nome = nome;
        if (email) usuario.email = email;
        if (senha) usuario.senha = senha;

        await usuario.save();

        res.status(200).send({ message: 'Usuário atualizado com sucesso' });
    } catch (error) {
        console.log('Erro: ', error);
        res.status(500).send({ error: 'Erro ao editar usuário' });
    }
}

function obterDadosUsuarioSessao(req, res) {
    if (req.session.usuario) {
        res.status(200).send(req.session.usuario);
    } else {
        res.status(404).send({ error: 'Usuário não encontrado na sessão' });
    }
}

function sair(req, res) {
    req.session.destroy();
    res.redirect('/');
}

module.exports = { cadastrarUsuario, autenticarUsuario, editarUsuario, obterDadosUsuarioSessao,sair };
