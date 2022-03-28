import express from "express";
import { authenticateLocal } from "../utils/auth/strategies";

import { AuthController } from "../controllers";

const authController = new AuthController();

const authRouter = express.Router();

authRouter.post("/signUp", authController.signUp);
authRouter.post(
  "/login",
  authenticateLocal("local", { session: false }),
  authController.login
);
authRouter.post("/refresh-tokens", authController.refreshTokens);

export default authRouter;
