import { User, UserDocument } from "../models";

interface IBudgetService {
  add({
    name,
    wallet,
    value,
  }: {
    name: string;
    wallet: string;
    value: number;
  }): Promise<UserDocument>;
}
class UserService implements IBudgetService {
  async add({ name, wallet, value }) {
    const budget = new User({ name, wallet, value });
    return await budget.save();
  }
}

export default UserService;
