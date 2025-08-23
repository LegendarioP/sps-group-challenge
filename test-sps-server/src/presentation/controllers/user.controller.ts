import { Request, Response } from 'express';
import { CreateUserUseCase, ListUsersUseCase, UpdateUserUseCase, DeleteUsersUseCase } from '../../application/use-cases/users';
import { userRepository } from '../../infrastructure/db/in-memory-user.repository';
import { hashService } from '../../infrastructure/security/hash.service';
import { jwtService } from '../../infrastructure/security/jwt.service';

const createUser = new CreateUserUseCase(userRepository, hashService, jwtService);
const listUsers = new ListUsersUseCase(userRepository);
const updateUser = new UpdateUserUseCase(userRepository, hashService);
const deleteUser = new DeleteUsersUseCase(userRepository)


export const UserController = {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const result = await createUser.execute(req.body);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async list(req: Request, res: Response): Promise<void> {
    try {
      const users = await listUsers.execute();
      res.json(users);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },


  async update(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;
      const updateData = { id: userId, ...req.body };
      
      await updateUser.execute(updateData);
    
      res.status(200).json({ 
        message: 'Usuário atualizado com sucesso'
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req: Request, res: Response): Promise<void> {
    try {
      await deleteUser.execute(req.params.id);
      res.json({ message: 'Usuário removido com sucesso' });
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }
};