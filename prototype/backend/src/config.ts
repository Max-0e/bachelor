import * as dotenv from 'dotenv';

dotenv.config();

export const PORT: number = parseInt(process.env.PORT || '3000');
export const SECRET: string = process.env.SECRET || 'DiesDasAnanas';
export const CLIENT_APP_URL: string = process.env.CLIENT_APP_URL || 'http://localhost:8080';

export const SMTP_HOST: string = process.env.SMTP_HOST || 'smtp.ethereal.email';
export const SMTP_PORT: number = parseInt(process.env.SMTP_PORT || '587');
export const SMTP_USER: string = process.env.SMTP_USER || 'bryce70@ethereal.email';
export const SMTP_PASS: string = process.env.SMTP_PASS || 'egJeJeSHGHaZNRur3b';

export const MONGO_URL: string = process.env.MONGO_URL || '';
export const MONGO_USER: string = process.env.MONGO_USER || '';
export const MONGO_PASSWORD: string = process.env.MONGO_PASSWORD || '';
export const MONGO_DB: string = process.env.MONGO_DB || '';
