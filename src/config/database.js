require('dotenv').config();

module.exports = {
 
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    define:{
      timespamps: true,
      undescored: true,
      undescoredAll: true,
    },
 
  // Você pode adicionar configurações para produção e teste também
};
