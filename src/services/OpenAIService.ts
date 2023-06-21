import { isAxiosError } from '@/types/typeGuards';
import { Details, IGreenWashingUser, IPrompt, ResponsePayload } from '@/types';
import axios from '../utils/axios';
import logger from '@/utils/logger';

const DEFAULT_ERROR_MESSAGE =
    'The AI service is experiencing high traffic. Please try again.';

export class OpenAIApi {
    public static getAssistedBySustainabilityMarketing = async (
        details: Details,
        chars: number
    ): Promise<
        ResponsePayload<{ text: string; userData: IGreenWashingUser }>
    > => {
        try {
            const { description, media, region } = details;
            const response = await axios.post(
                '/api/sustainabilityMarketing/getAssistedBySustainabilityMarketing',
                {
                    details: {
                        media,
                        region,
                        chars,
                        description,
                    },
                }
            );
            return response.data;
        } catch (error: unknown) {
            logger.error(
                'OpenAIService.getAssistedBySustainabilityMarketing: ',
                { error }
            );
            if (!isAxiosError(error)) return { error: DEFAULT_ERROR_MESSAGE };
            let errorMessage = DEFAULT_ERROR_MESSAGE;
            if (error.response?.status === 408) {
                errorMessage =
                    'The AI service is experiencing high traffic. Please try again.';
            }
            if (error.response?.status === 429) {
                errorMessage = 'Too many requests. Please try again later.';
            }
            return { error: errorMessage };
        }
    };

    public static savePrompt = async (prompt: IPrompt) => {
        try {
            const response = await axios.post(
                '/api/sustainabilityMarketing/savePrompt',
                prompt
            );
            return response.data;
        } catch (error: unknown) {
            logger.error(
                'OpenAIService.getAssistedBySustainabilityMarketing: ',
                { error }
            );
            if (!isAxiosError(error)) return { error: DEFAULT_ERROR_MESSAGE };
        }
    };

    public static getHistory = async (userId: string) => {
        try {
            const response = await axios.get(
                `/api/sustainabilityMarketing/getHistory/${userId}`
            );
            return response.data;
        } catch (error: unknown) {
            logger.error('OpenAIService.getHistory: ', { error });
            if (!isAxiosError(error)) return { error: DEFAULT_ERROR_MESSAGE };
        }
    };
}
