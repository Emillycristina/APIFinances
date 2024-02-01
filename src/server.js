
const app = require('./app');
const PORT = process.env.PORT || 3030;
const cors = require('cors');
const passport = require('../app/Controllers/Passport');

app.use(cors({
  origin: 'http://localhost:3000',  
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));
app.use(( res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');

  next();
});


app.use(passport.initialize());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
