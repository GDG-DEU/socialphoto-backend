export interface RegisterDTO {
    email: string;
    password: string;
}

export interface LoginDTO {
    email: string;
    password: string;
}

export interface AuthResponseDTO {
    id: string;
    email: string;
    token?: string;
}