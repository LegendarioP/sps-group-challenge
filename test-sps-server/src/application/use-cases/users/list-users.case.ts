import { IUserRepository } from '../../../domain/repositories/user.repository';
import { ListProfile } from '../../../presentation/dtos/user.dto';

export class ListUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(): Promise<ListProfile> {
    const users = await this.userRepository.list();
    
    if (!users || users.length === 0) {
      throw new Error('No users found');
    }

    return users.map(user => ({
      id: user.id,
      email: user.email,
      nome: user.nome,
      type: user.type
    }));
  }
}
