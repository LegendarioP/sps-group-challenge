export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export class User {
  constructor(
    public readonly id: string,
    public email: string,
    public nome: string,
    public type: UserRole,
    public password: string
  ) {}
}