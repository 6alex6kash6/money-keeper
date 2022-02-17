import { User, UserDocument } from "../models";
import DataService from "./DataAccess.service";

const dataService = new DataService(User);

interface IUserService {}
class UserService implements IUserService {
  async add({ email, password }) {
    const user = await dataService.create({ email, password });
    return user;
  }
}

export default UserService;
