export enum UserRole {
    Admin = 'admin',
    User = 'user'
}

export interface User {
    id?: string;
    email?: string;
    nome?: string;
    type?: UserRole;
}