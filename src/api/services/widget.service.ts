import { Widget, WidgetDocument } from "../models";

interface IBudgetService {
  add({
    name,
    wallet,
    value,
  }: {
    name: string;
    wallet: string;
    value: number;
  }): Promise<WidgetDocument>;
}
class WidgetService implements IBudgetService {
  async add({ name, wallet, value }) {
    const budget = new Widget({ name, wallet, value });
    return await budget.save();
  }
}

export default WidgetService;
