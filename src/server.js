
const app = require('./app');
const PORT = process.env.PORT || 3030;
const cors = require('cors');
const passport = require('../app/Controllers/Passport');


const corsOptions = {
  origin: ['https://finances-front-gilt.vercel.app',' https://finances-front-gilt.vercel.app/Login'],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204 
}

app.use(cors(corsOptions));


app.use(passport.initialize());

app.options('*', cors(corsOptions));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
