export interface User {
    id?: string;
    email: string;
    password_hash: string;
    is_verified: boolean;
    username: string;
    bio?: string;
    avatar_url?: string;
    created_at?: Date;
}