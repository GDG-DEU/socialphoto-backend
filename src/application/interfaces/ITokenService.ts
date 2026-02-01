import type { TokenDTO } from "../dto/token.dto.js";

export interface ITokenService {
  generateToken(userId: string): Promise<string>;
  verifyToken(token: string): Promise<TokenDTO | null>;
}
