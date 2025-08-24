import { Request, Response } from 'express';
import { CreateUserUseCase, ListUsersUseCase, UpdateUserUseCase, DeleteUsersUseCase } from '../../application/use-cases/users';
import { userRepository } from '../../infrastructure/db/in-memory-user.repository';
import { hashService } from '../../infrastructure/security/hash.service';
import { jwtService } from '../../infrastructure/security/jwt.service';
import { UserAlreadyExistsError, UserNotFoundError } from '../../shared/user.error';

const createUser = new CreateUserUseCase(userRepository, hashService, jwtService);
const listUsers = new ListUsersUseCase(userRepository);
const updateUser = new UpdateUserUseCase(userRepository, hashService);
const deleteUser = new DeleteUsersUseCase(userRepository)


export const UserController = {
  async create(req: Request, res: Response) {
    try {
      const result = await createUser.execute(req.body);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        return res.status(409).send({ error: error.message })
      }
      if (error instanceof Error) {
        return res.status(400).send({ error: error.message })
      }
      return res.status(400).send({ error: 'Unknown error' })
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


  async update(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const updateData = { id: userId, ...req.body };

      await updateUser.execute(updateData);

      res.status(200).json({
        message: 'Usuário atualizado com sucesso'
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send({ error: error.message })
      }
      return res.status(400).send({ error: 'Unknown error' })
    }
  },

  async delete(req: Request, res: Response) {
    try {
      await deleteUser.execute(req.params.id);
      res.json({ message: 'Usuário removido com sucesso' });
    } catch (error: any) {
      if (error instanceof UserNotFoundError) {
        return res.status(404).send({ error: error.message });
      }
      if (error instanceof Error) {
        return res.status(400).send({ error: error.message });
      }
      return res.status(400).send({ error: 'Unknown error' });
    }
  }
};