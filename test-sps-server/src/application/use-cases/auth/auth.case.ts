import { IUserRepository } from "../../../domain/repositories/user.repository";
import { IHashService } from "../../../domain/services/hash.service";
import { IJwtService } from "../../../domain/services/jwt.service";
import { Auth } from "../../../presentation/dtos/auth.dto";

export class AuthenticateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashService: IHashService,
    private readonly jwtService: IJwtService
  ) {}

  async execute(data: Auth.Input): Promise<Auth.Output> {
    if (!data.email || !data.password) {
      throw new Error("Email and password are required");
    }

    const existingUser = await this.userRepository.findByEmail(data.email);
    
    if (!existingUser) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await this.hashService.compare(data.password, existingUser.password);
    
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const token = await this.jwtService.generateToken({
      sub: existingUser.id,
      email: existingUser.email,
      nome: existingUser.nome,
      type: existingUser.type
    });

    return { 
      token
    };
  }
}