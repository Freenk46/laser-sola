export interface User {
    id: string;
    name: string;
    email: string;
    roles: string[];
    isBanned: boolean;
}


export interface AuthSchema {
    authData: User | null;
    loading: boolean;
    error: string | null;
}