require('dotenv').config();

module.exports = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT, 
  dialect: 'postgres',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
  
};

