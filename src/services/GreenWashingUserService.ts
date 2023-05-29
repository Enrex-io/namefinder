import { isAxiosError } from '../types/typeGuards';
import { IGreenWashingUser, ResponsePayload } from '@/types';
import axios from '../utils/axios';

const DEFAULT_ERROR_MESSAGE = 'GreenWashingUserService error';

export class GreenWashingUserService {
    public static getUser = async (): Promise<
        ResponsePayload<IGreenWashingUser>
    > => {
        try {
            const response = await axios.get(
                '/api/sustainabilityMarketing/user'
            );
            return response.data;
        } catch (error: unknown) {
            console.error('GreenWashingUserService.getUser: ', error);
            if (!isAxiosError(error)) return { error: DEFAULT_ERROR_MESSAGE };
            let errorMessage = DEFAULT_ERROR_MESSAGE;

            return { error: errorMessage };
        }
    };

    public static createUser = async (): Promise<
        ResponsePayload<IGreenWashingUser>
    > => {
        try {
            const response = await axios.post(
                '/api/sustainabilityMarketing/createUser'
            );
            return response.data;
        } catch (error: unknown) {
            console.error('GreenWashingUserService.createUser: ', error);
            if (!isAxiosError(error)) return { error: DEFAULT_ERROR_MESSAGE };
            let errorMessage = DEFAULT_ERROR_MESSAGE;

            return { error: errorMessage };
        }
    };
}
