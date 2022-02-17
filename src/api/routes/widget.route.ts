import express from "express";
import { WidgetController } from "../controllers";

const widgetRouter = express.Router();
const widgetController = new WidgetController();

widgetRouter.post("/api/entry", widgetController.addWidget);

widgetRouter.patch("/api/entry", widgetController.editWidget);

widgetRouter.get("/api/entry", widgetController.getWidget);

widgetRouter.delete("/api/entry", widgetController.deleteWidget);

export default widgetRouter;
