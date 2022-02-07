import express from "express";
import helmet from "helmet";

require("./db/index");
import { budgetRouter, userRoute, widgetRoute, entryRoute } from "./routes";

const PORT = 2727;

const app = express();

app.use(express.json());
app.use(helmet());

app.use(budgetRouter);
app.use(userRoute);
app.use(widgetRoute);
app.use(entryRoute);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
