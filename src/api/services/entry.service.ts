import { Entry, EntryDocument } from "../models";

interface IBudgetService {
  add({
    name,
    wallet,
    value,
  }: {
    name: string;
    wallet: string;
    value: number;
  }): Promise<EntryDocument>;
}
class EntryService implements IBudgetService {
  async add({ name, wallet, value }) {
    const budget = new Entry({ name, wallet, value });
    return await budget.save();
  }
}

export default EntryService;
