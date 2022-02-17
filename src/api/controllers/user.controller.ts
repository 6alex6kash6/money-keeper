import { UserService } from "../services";

const userService = new UserService();
class UserController {
  constructor() {}

  async addUser(req, res) {
    const result = await userService.add(req.body);
    res.send(result);
  }

  editUser(req, res) {}

  deleteUser(req, res) {}
}

export default UserController;
