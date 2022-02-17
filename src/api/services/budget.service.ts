import { Budget, BudgetDocument } from "../models";
import DataService from "./DataAccess.service";
import { BudgetServiceError } from "../types/errors.type";

const dataService = new DataService(Budget);

interface IBudgetService {
  add({
    name,
    wallet,
    value,
  }: {
    name: string;
    wallet: string;
    value: number;
  }): Promise<BudgetDocument | BudgetServiceError>;
  edit({
    budgetId,
    updates,
  }: {
    budgetId: string;
    updates: object;
  }): Promise<BudgetDocument | BudgetServiceError>;
  get(userId: string): Promise<BudgetDocument[] | BudgetServiceError>;
  delete(budgetId: string): Promise<void | BudgetServiceError>;
}
class BudgetService implements IBudgetService {
  async add({
    name,
    wallet,
    value,
  }): Promise<BudgetDocument | BudgetServiceError> {
    try {
      const budget = await dataService.create({
        name,
        wallet,
        value,
      });
      return budget;
    } catch (error) {
      if (error) {
        return new BudgetServiceError(error.message);
      }
    }
  }

  async edit({
    budgetId,
    ...updates
  }): Promise<BudgetDocument | BudgetServiceError> {
    try {
      const budget = await dataService.update(budgetId, { ...updates });
      return budget;
    } catch (error) {
      if (error) {
        return new BudgetServiceError(error.message);
      }
    }
  }

  async get(userId): Promise<BudgetDocument[] | BudgetServiceError> {
    try {
      const budgets = await dataService.get({ owner: userId });
      return budgets;
    } catch (error) {
      if (error) {
        return new BudgetServiceError(error.message);
      }
    }
  }

  async delete(budgetId) {
    try {
      const deletedBudget = dataService.delete({ _id: budgetId });
    } catch (error) {
      if (error) {
        return new BudgetServiceError(error.message);
      }
    }
  }
}

export default BudgetService;
