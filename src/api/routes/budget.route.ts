import express from "express";
import { BudgetController } from "../controllers";

const budgetRouter = express.Router();
const budgetController = new BudgetController();

budgetRouter.post("/api/budget", budgetController.addBudget);

budgetRouter.patch("/api/budget", budgetController.editBudget);

budgetRouter.get("/api/budget", budgetController.getBudget);

budgetRouter.delete("/api/budget", budgetController.deleteBudget);

export default budgetRouter;
