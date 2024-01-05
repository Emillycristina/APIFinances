const express = require('express');
const passport = require('../app/Controllers/Passport'); // Substitua pelo caminho real do seu arquivo Passport.js
const routes = require('./routes');
const convertDateMiddleware = require('../app/Controllers/ConverterDate');

import './database';

require('dotenv').config();

class App {
  constructor() {
    this.app = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(convertDateMiddleware);
    this.app.use(passport.initialize()); // Adicione esta linha para inicializar o Passport.js
  }

  routes() {
    this.app.use(routes);
  }
}

module.exports = new App().app;
