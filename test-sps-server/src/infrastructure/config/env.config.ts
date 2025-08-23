import dotenv from 'dotenv';

dotenv.config();

export const envConfig = {
    app: {
        port: process.env.PORT || 3001,
        frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
    },

    jwt: {
        secret: process.env.JWT_ACCESS_SECRET || 'secret-sps-challenge',
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '7D'
    },

    cors: {
        origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
        credentials: process.env.CORS_CREDENTIALS || false,
    },

    bcrypt: {
        saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || '12'),
    },
};
