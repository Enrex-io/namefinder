import { NodeEnvType } from '@/types';

export const NODE_ENV = process.env.NODE_ENV as NodeEnvType;
export const IS_PRODUCTION = NODE_ENV === 'production' || NODE_ENV === 'prod';
export const CONSOLE_LOGS_ENABLED = !IS_PRODUCTION;

const local = {
    g4gUrl: 'http://localhost:3000',
};

const dev = {
    g4gUrl: 'https://dev-10101.greenifs.com',
};

const test = {
    g4gUrl: 'http://localhost:3000',
};

const prod = {
    g4gUrl: 'https://app.greenifs.ai',
};

function getConfig(environment?: string) {
    switch (environment) {
        case 'production':
        case 'prod':
            return prod;
        case 'test':
            return test;
        case 'local':
            return local;
        default:
            return dev;
    }
}

const config = getConfig(process.env.NEXT_PUBLIC_APP_ENV);

export default config;
