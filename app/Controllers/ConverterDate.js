const { isDate, parse } = require('date-fns');

const convertDateMiddleware = (req, res, next) => {
  if (req.body && req.body.data) {
    // Converte a data de "dd-MM-yyyy" para "yyyy-MM-dd"
    const convertedDate = req.body.data.split('-').reverse().join('-');
    req.body.data = convertedDate;
  }
  next();
};

module.exports = convertDateMiddleware;