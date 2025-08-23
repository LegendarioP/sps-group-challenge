export namespace JwtService {
    export type Payload = {
        sub: string;
        email: string;
        nome: string;
        type: string;
    };

    export type Config = {
        secret: string;
        expiresIn: string;
    };
}


export interface IJwtService {
    generateToken(payload: JwtService.Payload): Promise<string>;
    verifyToken(token: string): Promise<JwtService.Payload>;
    decodeToken(token: string): JwtService.Payload | null;
}