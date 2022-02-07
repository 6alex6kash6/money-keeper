import { Request, Response } from "express";
import { BudgetService } from "../services";

const budgetService = new BudgetService();
class BudgetController {
  constructor() {}

  async addBudget(req: Request, res: Response) {
    const result = await budgetService.add(req.body);
    if (!result) {
      res.send("Error!").status(500);
    }
    res.send(result);
  }

  editBudget(req: Request, res: Response) {}

  deleteBudget(req: Request, res: Response) {}
}

export default BudgetController;
