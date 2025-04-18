export interface User {
    id: string;
    name: string;
    email: string;
}


export interface AuthSchema {
    authData: User | null;
    loading: boolean;
    error: string | null;
}