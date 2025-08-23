import { UserRole } from '../../../domain/entities/user.entity';
import { IUserRepository } from '../../../domain/repositories/user.repository';

export class DeleteUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string): Promise<void> {

    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new Error('No users found');
    }

    if(user.type === UserRole.ADMIN) {
        throw new Error('Admin users cannot be deleted');
    }

    const deletedUser = await this.userRepository.delete(user.id)

    if(!deletedUser) {
        throw new Error("Failed to remove user")
    }

  }
}
