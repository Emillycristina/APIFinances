const express = require('express');
const passport = require('../app/Controllers/Passport'); // Substitua pelo caminho real do seu arquivo Passport.js
const routes = require('./routes');
const convertDateMiddleware = require('../app/Controllers/ConverterDate');
const cors = require('cors');

require('./database');

require('dotenv').config();

const corsOptions = {
  origin: 'https://finances-front-gilt.vercel.app',
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204 
}


class App {
  constructor() {
    this.app = express();

    this.app.use(cors(corsOptions))
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(convertDateMiddleware);
    this.app.use(passport.initialize()); 
    
  }

  routes() {
    this.app.use(routes);
  }
}

module.exports = new App().app;
