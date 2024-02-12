
const app = require('./app');
const PORT = process.env.PORT || 3030;
const cors = require('cors');
const passport = require('../app/Controllers/Passport');


const addCustomHeaders = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://finances-front-gilt.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type','Authorization')
  res.header('Access-Control-Allow-Credentials', true);
 
  app.use(cors());
  
  next();
};

app.use(addCustomHeaders);


app.use(passport.initialize());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
