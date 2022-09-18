import { configService } from '@config/application.config';

export const APP_SECRET: string = configService.getValue('APP_SECRET');
export const PORT: string = configService.getValue('PORT');
