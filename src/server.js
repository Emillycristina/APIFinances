
const app = require('./app');
const PORT = process.env.PORT || 3030;
const cors = require('cors');
const passport = require('../app/Controllers/Passport');

app.use(passport.initialize());

app.use(cors({
  origin: '*',  
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
