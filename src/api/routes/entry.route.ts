import express from "express";
import { EntryController } from "../controllers";

const entryRouter = express.Router();
const entryController = new EntryController();

entryRouter.post("/api/entry", entryController.addEntry);

entryRouter.patch("/api/entry", entryController.editEntry);

entryRouter.get("/api/entry", entryController.getEntry);

entryRouter.delete("/api/entry", entryController.deleteEntry);

export default entryRouter;
