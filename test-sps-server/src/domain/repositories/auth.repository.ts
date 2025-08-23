import { UserAuth } from '../entities/auth.entity';


export interface IAuthRepository {
  findByEmail(email: string): Promise<UserAuth | null>;
}
