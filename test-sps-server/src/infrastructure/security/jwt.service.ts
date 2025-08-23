import jwt, { SignOptions } from 'jsonwebtoken';
import { IJwtService, JwtService } from '../../domain/services/jwt.service';
import { envConfig } from '../config/env.config';


export class JsonwebtokenJwtService implements IJwtService {
    private readonly jwtSecret: string;
    private readonly jwtExpiresIn: string;

    constructor() {
        this.jwtSecret = envConfig.jwt.secret || "default_access_secret"
        this.jwtExpiresIn = envConfig.jwt.expiresIn || "7D";
    }

    async generateToken(payload: JwtService.Payload): Promise<string> {
        return new Promise((resolve, reject) => {
            jwt.sign(
                payload,
                this.jwtSecret,
                {
                    expiresIn: this.jwtExpiresIn,
                } as SignOptions,
                (err, token) => {
                    if (err) {
                        reject(new Error(`Erro ao gerar token JWT: ${err.message}`));
                    } else {
                        resolve(token!);
                    }
                }
            );
        });
    }

    async verifyToken(token: string): Promise<JwtService.Payload> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this.jwtSecret, (err, decoded) => {
                if (err) {
                    if (err.name === 'TokenExpiredError') {
                        reject(new Error('Token expirado'));
                    } else if (err.name === 'JsonWebTokenError') {
                        reject(new Error('Token inválido'));
                    } else {
                        reject(new Error(`Erro ao verificar token: ${err.message}`));
                    }
                } else {
                    resolve(decoded as JwtService.Payload);
                }
            });
        });
    }

    decodeToken(token: string): JwtService.Payload | null {
        try {
            const decoded = jwt.decode(token) as JwtService.Payload;
            return decoded;
        } catch (error) {
            return null;
        }
    }
}

/**
 * Factory para criar instância única do serviço JWT
 */
export class JwtServiceFactory {
    static createJsonwebtokenService(): IJwtService {
        return new JsonwebtokenJwtService();
    }

    static getDefault(): IJwtService {
        return new JsonwebtokenJwtService();
    }

    static getInstance(): IJwtService {
        if (!JwtServiceFactory.instance) {
            JwtServiceFactory.instance = new JsonwebtokenJwtService();
        }
        return JwtServiceFactory.instance;
    }

    private static instance: IJwtService;
}

export const jwtService: IJwtService = JwtServiceFactory.getDefault();
