export interface User {
    id: string;
    name: string;
    email: string;
    roles: string[];
    isBanned: boolean;
  }
  export interface UserSchema {
    authData?: User;

  }

  