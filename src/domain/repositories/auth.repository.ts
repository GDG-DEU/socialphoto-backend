import type { RegisterDTO } from "../../application/dto/auth-dto.js"; 
import type { User } from "../entities/User.js"; 

export interface AuthRepository {
    register(registerDto: RegisterDTO): Promise<User>;
    
    findByEmail(email: string): Promise<User | null>;
}