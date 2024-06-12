const express = require('express');
const app = express();
const path = require('path');
const database = require('./config/db');
require('dotenv').config()

const indexRoutes = require('./routes/indexRoutes');
const loginRoutes = require('./routes/loginRoutes');
const productRoutes = require('./routes/produtoRoutes');

function initMiddleware() {
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.json());
}

function routes() {
    app.use('/', indexRoutes);
    app.use('/', loginRoutes);
    // app.use('/products', productRoutes); 
}

initMiddleware();
routes();
database.connectMongoDB(process.env.DATABASE_URL);

const server = app.listen(process.env.PORT, 'localhost', () => {
    console.log(`Servidor rodando em http://localhost:${server.address().port}`)
});
