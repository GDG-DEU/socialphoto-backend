import jwt from 'jsonwebtoken';

export class TokenService {
    private static readonly SECRET_KEY = process.env.JWT_SECRET as string;

    // A function that generates tokens for the user upon successful login
    static generateToken(userId: string): string {
        return jwt.sign({ id: userId }, this.SECRET_KEY, {
            expiresIn: '1d'
        });
    }

    //Checks if the received token is valid
    static verifyToken(token: string): any {
        try {
            //Control token
            return jwt.verify(token, this.SECRET_KEY);
        } catch (error) {
            // The ticket will return null if it is fake or expired.
            return null; 
        }
    }
}