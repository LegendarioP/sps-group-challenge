import { User } from '../entities/user.entity';


export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  create(userData: Omit<User, 'id'>): Promise<User>;
  update(id: string, updateData: Partial<Omit<User, 'id'>>): Promise<User | null>;
  delete(id: string): Promise<boolean>;
  list(): Promise<User[]>;
}
