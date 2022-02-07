import express from "express";
import { BudgetController } from "../controllers";

const budgetRouter = express.Router();
const budgetController = new BudgetController();

budgetRouter.post("/api/budget", budgetController.addBudget);

export default budgetRouter;
