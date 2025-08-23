import { UserTokenData } from '../types/jwt.ts';
import Cookie from 'js-cookie';
import { jwtDecode } from "jwt-decode";


export class JwtManager {
    private decoded: UserTokenData | null = null;
    private tokenName: string = "token";

    public setToken(token: string) {
        const decodedToken = jwtDecode<UserTokenData>(token)
        if (!decodedToken) {
            throw new Error("Error decoding JWT token");
        }
        this.decoded = decodedToken;
        try {
            const expiresAt = new Date(decodedToken.exp * 1000);
            Cookie.set(this.tokenName, token, {
                expires: expiresAt,
                path: '/'
            });
        } catch (error) {
            throw new Error("Failed to set JWT cookie: " + error);
        }
    }

    public getDecodedToken(): UserTokenData {
        if (this.decoded) return this.decoded;

        const token = Cookie.get(this.tokenName);
        if (!token) {
            throw new Error("No JWT token found");
        }

        try {
            this.decoded = jwtDecode<UserTokenData>(token);
            return this.decoded;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error("Error decoding JWT token: " + error.message);
            }
            throw new Error("Unknown error decoding JWT token");
        }
    }

    public getTokenFromCookies(): string {

        if(!Cookie.get(this.tokenName)){
            throw new Error("No JWT token found");
        }

        return Cookie.get(this.tokenName);
    }

}