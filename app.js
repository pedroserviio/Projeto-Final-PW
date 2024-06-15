const express = require('express');
const session = require('express-session')
const app = express();
const path = require('path');
const database = require('./config/db');
require('dotenv').config()

const indexRoutes = require('./src/routes/indexRoutes');
const loginRoutes = require('./src/routes/loginRoutes');
const productRoutes = require('./src/routes/produtoRoutes');
const usuarioRoutes = require('./src/routes/usuarioRoutes');

function initMiddleware() {
    app.use(express.static(path.join(__dirname , 'src', 'views')));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(session(
        {
            secret: 'secret-token',
            name: 'sessionId',  
            resave: false,
            saveUninitialized: false
        }
    ));
}

function routes() {
    app.use('/', indexRoutes);
    app.use('/', loginRoutes);
    app.use('/', productRoutes); 
    app.use('/usuario', usuarioRoutes);
}

initMiddleware();
routes();
database.connectMongoDB(process.env.DATABASE_URL);

const server = app.listen(process.env.PORT, 'localhost', () => {
    console.log(`Servidor rodando em http://localhost:${server.address().port}`)
});
