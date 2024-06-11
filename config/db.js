const mongoose = require('mongoose');

async function connectMongoDB(databaseUrl) {
    try {
        await mongoose.connect(databaseUrl)
        .then(() => console.log('Conexão ao MongoDB estabelecida com sucesso'))
        .catch(err => console.error('Erro ao conectar ao MongoDB:', err));
    } catch (error) {
        console.error("Erro na conexão com o banco de dados:", error);
    }
}

module.exports = { connectMongoDB };