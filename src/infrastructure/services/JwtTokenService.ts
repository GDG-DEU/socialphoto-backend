import { SignJWT, jwtVerify } from "jose";
import type { ITokenService } from "../../application/interfaces/ITokenService.js";
import type { TokenDTO } from "../../application/dto/token.dto.js";
import { getEnv } from "../config/env.js";

const JWT_SECRET = new TextEncoder().encode(getEnv("JWT_SECRET"));
const JWT_EXPIRY = getEnv("JWT_EXPIRY");

export class JwtTokenService implements ITokenService {
  async generateToken(userId: string): Promise<string> {
    const token = await new SignJWT({ userId })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(JWT_EXPIRY)
      .sign(JWT_SECRET);

    return token;
  }

  async verifyToken(token: string): Promise<TokenDTO | null> {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      if (typeof payload.userId === "string") {
        return { userId: payload.userId };
      }
      return null;
    } catch {
      return null;
    }
  }
}
