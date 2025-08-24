import { UserRole } from "./user.ts";

export interface UserTokenData {
    id: string;
    email: string;
    nome: string;
    type: UserRole;
    exp: number;
}
