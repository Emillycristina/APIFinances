const express = require('express');
const routes = require('./routes');
const convertDateMiddleware = require('../app/Controllers/ConverterDate')

import './database'

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
  }

  routes() {
    this.app.use(routes);
  }
}

module.exports = new App().app;