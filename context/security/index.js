const assert = require('assert');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'W5rX3JlYWRlciJrLCJqdGkiOiJiaGdjr3bGl6amZ5IiwiYWxnIjoiSFMyNTYiLCJ',
  issuer: 'accounts.samuseum.com.au',
  audience: 'samuseum.com.au',
};

module.exports = ({ $id }) => {
  passport.use(
    new JwtStrategy(opts, function(jwtPayload, done) {
      done(null, jwtPayload.sub);
    })
  );

  return {
    initialize() {
      return passport.initialize();
    },
    authenticate(strategy = 'jwt') {
      assert(strategy, 'Authentication strategy not specified.');

      return (req, res, next) => {
        return new Promise((resolve, reject) => {
          passport.authenticate(strategy, function(err, user) {
            if (err) return reject(err);
            if (!user) return reject(new Error('No user found.'));

            req.user = user;
            next();
          })(req, res, next);
        });
      };
    },
    createToken(user) {
      return jwt.sign(
        {
          iss: opts.issuer,
          aud: opts.audience,
          sub: user,
          jti: $id(),
          alg: 'HS256',
        },
        opts.secretOrKey
      );
    },
  };
};
