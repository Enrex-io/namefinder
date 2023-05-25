import { isAxiosError } from '../types/typeGuards';
import { Details, ResponsePayload } from '@/types';
import axios from '../utils/axios';

const DEFAULT_ERROR_MESSAGE =
  'The AI service is experiencing high traffic. Please try again.';
export class OpenAIApi {
  public static getAssistedBySustainabilityMarketing = async (
    details: Details,
    chars: number
  ): Promise<ResponsePayload<string>> => {
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
      console.error(
        'OpenAIService.getAssistedBySustainabilityMarketing: ',
        error
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
}
