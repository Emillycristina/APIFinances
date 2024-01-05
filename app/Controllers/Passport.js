const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
import User from '../Models/User';
require('dotenv').config();

const { TOKEN_JWT } = process.env;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: TOKEN_JWT,
};

passport.use(
  new Strategy(opts, async (jwtPayload, done) => {
    try {
      // Lógica para buscar usuário no banco de dados usando jwtPayload.id
      const user = await User.findByPk(jwtPayload.id);

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
