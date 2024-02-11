const addCustomHeaders = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type','Authorization')
    res.header('Access-Control-Allow-Credentials', true);
   
    next();
  };

  module.exports = {
    addCustomHeaders
  };