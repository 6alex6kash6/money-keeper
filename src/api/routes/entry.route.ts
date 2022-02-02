import express from "express";
import { EntryController } from "../controllers";

const entryRouter = express.Router();
const entryController = new EntryController();

export default entryRouter;
