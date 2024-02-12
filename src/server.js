
const app = require('./app');
const PORT = process.env.PORT || 3030;
//const cors = require('cors');
const { addCustomHeaders } = require('./middleware');
const passport = require('../app/Controllers/Passport');



app.use(addCustomHeaders);


app.use(passport.initialize());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
