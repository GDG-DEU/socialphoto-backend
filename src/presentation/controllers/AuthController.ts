import type { Request, Response } from "express";
import { RegisterUser } from "../../application/use-cases/Authentication/RegisterUser.js";
import { LoginUser } from "../../application/use-cases/Authentication/LoginUser.js";
import { GetCurrentUser } from "../../application/use-cases/Authentication/GetCurrentUser.js";
import { UserRepository } from "../../infrastructure/repositories/UserRepository.js";
import { BcryptPasswordHasher } from "../../infrastructure/services/BcryptPasswordHasher.js";
import { JwtTokenService } from "../../infrastructure/services/JwtTokenService.js";
import { VerifyEmail } from "../../application/use-cases/Authentication/VerifyEmail.js";
import { PasswordChangeRequest } from "../../application/use-cases/Authentication/PasswordChangeRequest.js";
import { PasswordChange } from "../../application/use-cases/Authentication/PasswordChange.js";
import { PasswordService } from "../../infrastructure/services/password.service.js";


//DTO
interface PasswordChangeRequestDTO { email: string; }
interface PasswordChangeDTO { token: string; newPassword: string; }

// Bağımlılıkları başlat
const userRepository = new UserRepository();
const passwordHasher = new BcryptPasswordHasher();
const tokenService = new JwtTokenService();

// Use caseleri başlat
const registerUser = new RegisterUser(userRepository, passwordHasher);
const loginUser = new LoginUser(userRepository, passwordHasher, tokenService);
const getCurrentUser = new GetCurrentUser(userRepository);
const verifyEmail = new VerifyEmail(userRepository);
const passwordChangeRequest = new PasswordChangeRequest(userRepository);
const passwordChange = new PasswordChange(userRepository);

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, username, password } = req.body;

      if (!email || !username || !password) {
        res
          .status(400)
          .json({ error: "E-posta, kullanıcı adı ve şifre gerekli" });
        return;
      }

      const user = await registerUser.execute({ email, username, password });
      res.status(201).json(user);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Kayıt başarısız";
      res.status(400).json({ error: message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: "E-posta ve şifre gerekli" });
        return;
      }

      const result = await loginUser.execute({ email, password });
      res.status(200).json(result);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Giriş başarısız";
      res.status(401).json({ error: message });
    }
  }

  async getMe(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.userId;

      if (!userId) {
        res.status(401).json({ error: "Yetkisiz erişim" });
        return;
      }

      const user = await getCurrentUser.execute(userId);
      res.status(200).json(user);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Kullanıcı bulunamadı";
      res.status(404).json({ error: message });
    }
  }

  async verifyMail(req: Request, res: Response): Promise<void> {
    try {
      const { email,token } = req.query;

      if (!token || !email) {
        res.status(400).json({ error: "Doğrulama token'ı ve e-posta gerekli" });
        return;
      }

      await verifyEmail.execute(token as string,email as string);
      res.status(200).json({ message: "E-posta başarıyla doğrulandı!" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Doğrulama başarısız";
      res.status(400).json({ error: message });
    }
  }

  async passwordChangeRequest(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      if (!email) {
        res.status(400).json({ error: "E-posta adresi gerekli" });
        return;
      }

      await passwordChangeRequest.execute(email);
      res.status(200).json({ message: "Şifre sıfırlama kodu gönderildi." });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async passwordChange(req: Request, res: Response): Promise<void> {
    try {
      const { email, token, newPassword } = req.body; // 'token' burada maildeki koddur

      if (!email || !token || !newPassword) {
        res.status(400).json({ error: "E-posta, kod ve yeni şifre gerekli" });
        return;
      }

      await passwordChange.execute(email, token, newPassword);
      
      res.status(200).json({ message: "Şifreniz başarıyla değiştirildi." });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export const authController = new AuthController();


