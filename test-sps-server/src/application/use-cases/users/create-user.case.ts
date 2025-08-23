import { IUserRepository } from '../../../domain/repositories/user.repository';
import { IHashService } from '../../../domain/services/hash.service';
import { UserRole } from '../../../domain/entities/user.entity';
import { CreateUser } from '../../../presentation/dtos/user.dto';
import { IJwtService } from '../../../domain/services/jwt.service';


export class CreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashService: IHashService,
    private readonly jwtService: IJwtService
  ) {}

  async execute(input: CreateUser.Input): Promise<CreateUser.Output> {
    if (!input.nome || !input.email || !input.password) {
      throw new Error('Nome, email e password são obrigatórios');
    }

    const existingUser = await this.userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await this.hashService.hash(input.password);

    const user = await this.userRepository.create({
      email: input.email,
      nome: input.nome,
      type: UserRole.USER,
      password: hashedPassword
    });

    const token = await this.jwtService.generateToken({
      sub: user.id,
      email: user.email,
      nome: user.nome,
      type: user.type
    });

    return {
      token
    };
  }
}
