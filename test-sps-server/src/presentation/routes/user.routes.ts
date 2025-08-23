import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { AuthMiddlewareFactory } from '../../infrastructure/middleware/auth.middleware';

const router = Router();
const authMiddleware = AuthMiddlewareFactory.getInstance();

router.post('/', UserController.create);
router.get('/', authMiddleware.authenticate, UserController.list);
router.put('/:id', authMiddleware.authenticate, UserController.update);
router.delete('/:id', authMiddleware.authenticate, UserController.delete);

export default router;
