import { Request, Response } from "express";
import { BudgetServiceError } from "../types/errors.type";
import { BudgetService } from "../services";

const budgetService = new BudgetService();
class BudgetController {
  constructor() {}

  async addBudget(req: Request, res: Response) {
    try {
      const result = await budgetService.add(req.body);
      res.send(result);
    } catch (err) {
      if (err instanceof BudgetServiceError) {
        res.status(500);
      }
    }
  }

  async editBudget(req: Request, res: Response) {
    try {
      const result = await budgetService.edit(req.body);
      res.send(result);
    } catch (err) {
      if (err instanceof BudgetServiceError) {
        res.send(err).status(500);
      }
    }
  }

  async getBudget(req: Request, res: Response) {
    try {
      const { userId } = req.body;
      const result = await budgetService.get(userId);
      res.send(result);
    } catch (err) {
      if (err instanceof BudgetServiceError) {
        res.send(err).status(500);
      }
    }
  }

  async deleteBudget(req: Request, res: Response) {
    try {
      const { id } = req.body;
      const result = await budgetService.delete(id);
      res.send(result);
    } catch (err) {
      if (err instanceof BudgetServiceError) {
        res.send(err).status(500);
      }
    }
  }
}

export default BudgetController;
