const addCustomHeaders = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Custom-Header', 'Valor do Cabeçalho Personalizado');
    // Adicione outros cabeçalhos necessários aqui
    next();
  };

  module.exports = {
    addCustomHeaders
  };