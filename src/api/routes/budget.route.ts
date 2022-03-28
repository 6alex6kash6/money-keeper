import express from "express";
import { BudgetController } from "../controllers";
import { authenticateJwt } from "../utils/auth/strategies";

const budgetRouter = express.Router();
const budgetController = new BudgetController();

// @ts-ignore
budgetRouter.post("/api/budget", authenticateJwt, budgetController.addBudget);

budgetRouter.patch("/api/budget", budgetController.editBudget);

budgetRouter.get("/api/budget", budgetController.getBudget);

budgetRouter.delete("/api/budget", budgetController.deleteBudget);

export default budgetRouter;
