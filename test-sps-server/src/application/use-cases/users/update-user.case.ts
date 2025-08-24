import { NotFoundError } from '../../../../../test-sps-react/src/lib/api-errors';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { IHashService } from '../../../domain/services/hash.service';
import { UpdateUser } from '../../../presentation/dtos/user.dto';

export class UpdateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashService: IHashService
) {}

  async execute(data: UpdateUser.Input): Promise<UpdateUser.Output> {
    const user = await this.userRepository.findById(data.id);

    if (!user) {
      throw new NotFoundError();
    }

    const updateData: Partial<Omit<typeof user, 'id'>> = {};
    
    if (data.nome !== undefined) {
      updateData.nome = data.nome;
    }
    
    if (data.email !== undefined) {
      updateData.email = data.email;
    }
    
    if (data.password !== undefined) {
      updateData.password = await this.hashService.hash(data.password);
    }

    const updatedUser = await this.userRepository.update(data.id, updateData);
    
    if (!updatedUser) {
      throw new Error('Failed to update user');
    }
  }
}
