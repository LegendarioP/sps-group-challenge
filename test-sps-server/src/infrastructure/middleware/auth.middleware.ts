import { Request, Response, NextFunction } from 'express';
import { JwtServiceFactory } from '../security/jwt.service';
import { IJwtService } from '../../domain/services/jwt.service';


export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
    nome: string;
    type: string;
  };
}

export class AuthMiddleware {
  private jwtService: IJwtService;

  constructor() {
    this.jwtService = JwtServiceFactory.getInstance();
  }

  authenticate = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader) {
        res.status(401).json({
          success: false,
          message: 'Token de acesso requerido'
        });
        return;
      }

      const parts = authHeader.split(' ');
      if (parts.length !== 2 || parts[0] !== 'Bearer') {
        res.status(401).json({
          success: false,
          message: 'Formato de token inválido. Use: Bearer <token>'
        });
        return;
      }

      const token = parts[1];

      const decoded = await this.jwtService.verifyToken(token);

      req.user = {
        userId: decoded.sub,
        email: decoded.email,
        nome: decoded.nome,
        type: decoded.type
      };

      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error.message || 'Token inválido'
      });
    }
  };

}

class AuthMiddlewareFactory {
  private static instance: AuthMiddleware;

  static getInstance(): AuthMiddleware {
    if (!AuthMiddlewareFactory.instance) {
      AuthMiddlewareFactory.instance = new AuthMiddleware();
    }
    return AuthMiddlewareFactory.instance;
  }
}

export { AuthMiddlewareFactory };
