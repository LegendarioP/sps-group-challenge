import bcrypt from 'bcrypt';
import { IHashService } from '../../domain/services/hash.service';

export class BcryptHashService implements IHashService {
    private readonly saltRounds: number;

    constructor(saltRounds: number = 12) {
        this.saltRounds = saltRounds;
    }

    async hash(password: string): Promise<string> {
        if (!password) {
            throw new Error('Password cannot be empty');
        }

        try {
            return await bcrypt.hash(password, this.saltRounds);
        } catch (error) {
            throw new Error(`Failed to hash password: ${error}`);
        }
    }
    async compare(password: string, hashedPassword: string): Promise<boolean> {
        if (!password || !hashedPassword) {
            throw new Error('Password and hashedPassword cannot be empty');
        }

        try {
            return await bcrypt.compare(password, hashedPassword);
        } catch (error) {
            throw new Error(`Failed to compare password: ${error}`);
        }
    }

    isHashed(value: string): boolean {
        return /^\$2[abxy]\$\d{1,2}\$/.test(value);
    }


    getSaltRounds(): number {
        return this.saltRounds;
    }
}
