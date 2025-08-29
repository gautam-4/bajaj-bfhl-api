const express = require('express');
const bfhlRouter = require('./routes/bfhl.route');
const errorHandler = require('./middlewares/error.middleware');

const app = express();
app.use(express.json());

app.use('/bfhl', bfhlRouter);

app.use(errorHandler);

module.exports = app;
