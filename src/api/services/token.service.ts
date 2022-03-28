import jwt from "jsonwebtoken";

import { Token } from "../models";
import DataService from "./DataAccess.service";

const dataService = new DataService(Token);

interface ITokenService {
  generateTokens(payload: string): {
    accessToken: string;
    refreshToken: string;
  };

  validateTokens(payload: object): void;
}

class TokenService implements ITokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, "test", { expiresIn: "10m" });
    const refreshToken = jwt.sign(payload, "test", { expiresIn: "30d" });

    return {
      accessToken,
      refreshToken,
    };
  }

  validateTokens(payload) {
    const { accessToken, refreshToken } = payload;
    const isAccessTokenValid = jwt.verify(accessToken, "test");
    const isRefreshTokenValid = jwt.verify(refreshToken, "test");

    return { isAccessTokenValid, isRefreshTokenValid };
  }

  async filterExpiredRefreshTokens(token, tokenForUpdate = null) {
    const { sub } = jwt.decode(token);

    await Token.updateOne(
      { userId: sub },
      { $pull: { refreshTokens: { $in: [token] } } }
    );

    tokenForUpdate &&
      (await Token.updateOne(
        { userId: sub },
        { $push: { refreshTokens: tokenForUpdate } }
      ));
  }

  async refreshTokens(token) {
    const { sub } = jwt.decode(token);
    const tokenPair = this.generateTokens({
      sub,
      iat: Date.now(),
    });
    await this.filterExpiredRefreshTokens(token, tokenPair.refreshToken);

    return tokenPair;
  }
}

export default TokenService;
