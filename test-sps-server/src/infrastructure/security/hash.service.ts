import { BcryptHashService } from './bcrypt-hash.service';
import { IHashService } from '../../domain/services/hash.service';
import { envConfig } from '../config/env.config';


export class HashServiceFactory {
    static createBcryptService(saltRounds?: number): IHashService {
        return new BcryptHashService(saltRounds);
    }

    static getDefault(): IHashService {
        return new BcryptHashService(envConfig.bcrypt.saltRounds);
    }
}

export const hashService: IHashService = HashServiceFactory.getDefault();
