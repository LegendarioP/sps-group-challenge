import { randomUUID } from 'crypto';
import { User, UserRole } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user.repository';


export class InMemoryUserRepository implements IUserRepository {
  private users: User[] = [];

  constructor() {
    this.users = [
      new User(randomUUID(), "admin@sps.com", "administrador", UserRole.ADMIN, "$2b$12$nBatMBn86o7mz8HepDSlqOBKvDDTiVWvAAmV5zgkuQMPyRKmiUrB6")
    ];
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(u => u.email === email);
    return user || null;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find(u => u.id === id);
    return user || null;
  }

  async create(userData: Omit<User, 'id'>): Promise<User> {
    const user = new User(
      randomUUID(),
      userData.email,
      userData.nome,
      userData.type,
      userData.password
    );
    
    this.users.push(user);
    return user;
  }

  async update(id: string, updateData: Partial<Omit<User, 'id'>>): Promise<User | null> {
    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      return null;
    }

    const currentUser = this.users[userIndex];
    
    const updatedUser = new User(
      currentUser.id,
      updateData.email ?? currentUser.email,
      updateData.nome ?? currentUser.nome,
      updateData.type ?? currentUser.type,
      updateData.password ?? currentUser.password
    );

    this.users[userIndex] = updatedUser;
    
    return updatedUser;
  }

  async delete(id: string): Promise<boolean> {
    const initialLength = this.users.length;
    this.users = this.users.filter(u => u.id !== id);
    return this.users.length < initialLength;
  }

  async list(): Promise<User[]> {
    return [...this.users];
  }

}


export const userRepository = new InMemoryUserRepository();
