import express from "express";
import passport from "passport";
import {Strategy as JwtStrategy, ExtractJwt} from "passport-jwt";

import {UserController} from "../controllers";
import {User} from "../models";
import Authentication from "../core/auth/auth";

const userController = new UserController();
const authentication = new Authentication()

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "test",
};

export const strategy = new JwtStrategy(options, (jwt_payload, done) => {
    User.findOne({id: jwt_payload.sub}, function (err, user) {
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

const userRouter = express.Router();
const authenticate = passport.authenticate("jwt", {session: false});
userRouter.post("/api/auth/register", authentication.registerUser);
userRouter.post("/api/auth/login", authenticate, (req, res) => {
    res.status(200).json({success: true, message: 'Authorization successfully'})
});

export default userRouter;

/*TODO:
1. implement route for login
2. hash password with bcrypt
3. refactor user service and controller
 */
