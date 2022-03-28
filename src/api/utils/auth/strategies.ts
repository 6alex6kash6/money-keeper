import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";

const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
import passport from "passport";
import jwt from "jsonwebtoken";

import { User } from "../../models";
import { TokenService } from "../../services";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "test",
};

const tokenService = new TokenService();
/* TODO:
          3. проверить актуальность accessToken
            3.1 если он истек проверить совпадение рефреш токена(который в куках) и выдать новую пару токенов
              3.1.1 проверить актуальность рефреш токена, если он протух сгенерировать пару токенов и удалить протухший рефреш
           */
export const jwtStrategy = new JwtStrategy(options, (jwtPayload, done) => {
  User.findOne({ _id: jwtPayload.sub }, function (err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
      // or you could create a new account
    }
  });
});

export const authenticateJwt = passport.authenticate("jwt", { session: false });
// (strategy = "jwt", options = { session: false }) =>
// (req, res, next) => {
//   passport.authenticate(strategy, options, (err, user) => {
//     const { accessToken } = req.body;
//     const { refreshToken } = req.cookies;
//
//     const { isAccessTokenValid, isRefreshTokenValid } =
//       tokenService.validateTokens({
//         accessToken,
//         refreshToken,
//       });
//
//     if (!isAccessTokenValid || !isRefreshTokenValid) {
//       res.send({ message: "Invalid Tokens" });
//     } else next();
//   });
// }

export const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    User.findOne({ email }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      bcrypt.compare(password, user.password).then((res) => {
        if (!res) {
          return done(null, false);
        }
        return done(null, user);
      });
    });
  }
);

export const authenticateLocal = (strategy, options) => (req, res, next) => {
  passport.authenticate(strategy, options, (err, user) => {
    req.user = user;
    next();
  })(req, res, next);
};
