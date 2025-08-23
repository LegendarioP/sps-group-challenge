export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export namespace GetProfile {
  export type Input = {
    token: string;
  };

  export type Output = {
    id: string;
    nome: string;
    email: string;
    type: UserRole
  };
}

export type ListProfile = {
  id: string;
  nome: string;
  email: string;
  type: UserRole;
}[];

export namespace CreateUser {
  export type Input = {
    nome: string;
    email: string;
    password: string;
  };

  export type Output = {
    token: string;
  };
}

export namespace UpdateUser {
  export type Input = {
    id: string;
    nome?: string;
    email?: string;
    password?: string;
  };

  export type Output = void;
}