import express from "express";
import helmet from "helmet";
import passport from "passport";

const cookieParser = require("cookie-parser");

require("./db/index");
import { budgetRouter, authRoute, widgetRoute, entryRoute } from "./routes";
import { jwtStrategy, localStrategy } from "./utils/auth/strategies";

const PORT = 2727;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);
passport.use("local", localStrategy);

app.use(budgetRouter);
app.use("/api/auth", authRoute);
app.use(widgetRoute);
app.use(entryRoute);

app.listen(PORT, () => {
  console.log(`App here mfucka ${PORT}`);
});
