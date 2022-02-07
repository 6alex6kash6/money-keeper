import { Budget, BudgetDocument } from "../models";

interface IBudgetService {
  add({
    name,
    wallet,
    value,
  }: {
    name: string;
    wallet: string;
    value: number;
  }): Promise<BudgetDocument>;
}
class BudgetService implements IBudgetService {
  async add({ name, wallet, value }) {
    const budget = new Budget({ name, wallet, value });
    return await budget.save();
  }
}

export default BudgetService;
