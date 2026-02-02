import type { Response, NextFunction } from "express";
import type { AuthenticatedRequest } from "../controllers/AuthController.js";
import { JwtTokenService } from "../../infrastructure/services/JwtTokenService.js";

const tokenService = new JwtTokenService();
// Tokeni doğrular ve isteği devam ettirir
export async function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ error: "Token bulunamadı" });
      return;
    }

    const token = authHeader.substring(7); // Remove "Bearer " prefix

    const payload = await tokenService.verifyToken(token);

    if (!payload) {
      res.status(401).json({ error: "Geçersiz veya süresi dolmuş token" });
      return;
    }

    req.userId = payload.userId;
    next();
  } catch {
    res.status(401).json({ error: "Kimlik doğrulama hatası" });
  }
}
