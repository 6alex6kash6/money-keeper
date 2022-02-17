import express from "express";
import helmet from "helmet";
import passport from "passport";

require("./db/index");
import { budgetRouter, userRoute, widgetRoute, entryRoute } from "./routes";
import { strategy } from "./routes/user.route";

const PORT = 2727;

const app = express();

app.use(express.json());
app.use(helmet());
app.use(passport.initialize());
passport.use("jwt", strategy);

app.use(budgetRouter);
app.use(userRoute);
app.use(widgetRoute);
app.use(entryRoute);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
