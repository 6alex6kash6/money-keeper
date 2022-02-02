import express from "express";
import helmet from "helmet";

require("./db/index");
import { budgetRoute, userRoute, widgetRoute, entryRoute } from "./routes";

const PORT = 2727;
const apiRoutes = {
  user: userRoute,
  widget: widgetRoute,
  entry: entryRoute,
  budget: budgetRoute,
};

const app = express();

for (const path in apiRoutes) {
  app.use(`api/${path}`, apiRoutes[path]);
}

app.use(helmet());
app.use("api/user", userRoute);

app.listen(PORT, () => {
  console.log(`Example app listening on port port ${PORT}`);
});
