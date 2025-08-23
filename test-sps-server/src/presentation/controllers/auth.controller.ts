import { Request, Response } from 'express';
import { userRepository } from '../../infrastructure/db/in-memory-user.repository';
import { hashService } from '../../infrastructure/security/hash.service';
import { jwtService } from '../../infrastructure/security/jwt.service';
import { AuthenticateUserUseCase } from '../../application/use-cases/auth/auth.case';



const authenticateUser = new AuthenticateUserUseCase(userRepository, hashService, jwtService);

export const AuthController = {
  async signIn(req: Request, res: Response): Promise<void> {
    try {
      const result = await authenticateUser.execute(req.body);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  },
};