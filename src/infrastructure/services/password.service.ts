import bcrypt from 'bcrypt';

export class PasswordService {
    // Hashing the password (during registration)
    static async hash(password: string): Promise<string> {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    }

    // Comparing passwords (during login)
    static async compare(rawPassword: string, encryptedPassword: string): Promise<boolean> {
        return await bcrypt.compare(rawPassword, encryptedPassword);
    }
}
