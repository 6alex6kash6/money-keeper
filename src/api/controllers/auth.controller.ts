import { Request, Response } from "express";
import { AuthService, TokenService } from "../services";
import { AuthServiceError } from "../types/errors.type";

const authService = new AuthService();
const tokenService = new TokenService();

class AuthController {
  constructor() {}

  async signUp(req: Request, res: Response) {
    try {
      await authService.createUser(req.body);

      res.status(200).send({ success: true, message: "User created!" });
    } catch (err) {
      if (err instanceof AuthServiceError) {
        res.status(500);
      }
    }
  }

  async login(req: Request, res: Response) {
    const { user } = req;
    if (!user) {
      res.status(401).send({ success: false });
    }
    const { accessToken, refreshToken } = await authService.loginUser(user);

    res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 2592000000, //30 days
      })
      .json({
        success: true,
        accessToken,
        message: "Authorization successfully",
      });
  }

  async refreshTokens(req: Request, res: Response) {
    const { accessToken } = req.body;
    const { refreshToken } = req.cookies;
    const { isAccessTokenValid, isRefreshTokenValid } =
      tokenService.validateTokens({
        accessToken,
        refreshToken,
      });

    if (!isRefreshTokenValid) {
      await tokenService.filterExpiredRefreshTokens(refreshToken);
      res.redirect("/login");
      return;
    }
    // const refreshedTokenPair = await tokenService.refreshTokens(refreshToken);
    await tokenService
      .refreshTokens(refreshToken)
      .then((refreshedTokenPair) => {
        res
          .cookie("refreshToken", refreshedTokenPair.refreshToken, {
            httpOnly: true,
            maxAge: 2592000000, //30 days
          })
          .send({
            message: "Tokens updated",
            accessToken: refreshedTokenPair.accessToken,
          });
      })
      .catch((e) => {
        throw new Error(e);
      });
  }
}

export default AuthController;
