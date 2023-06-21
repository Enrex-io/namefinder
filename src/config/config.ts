import { NodeEnvType } from '@/types';

export const NODE_ENV = process.env.NODE_ENV as NodeEnvType;
export const IS_PRODUCTION = NODE_ENV === 'production' || NODE_ENV === 'prod';
export const CONSOLE_LOGS_ENABLED = !IS_PRODUCTION;
