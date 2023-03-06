import { CompanyDetails, GoalDescription } from "@/types";
import { getGoalsByResponseString } from "@/utils/formatters";
import { shuffleArray } from "@/utils/helpers";

const { Configuration, OpenAIApi } = require("openai");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const DEFAULT_TEMPERATURE = 0.1;
const DEFAULT_MAX_TOKENS = 200;
const DEFAULT_MODEL = "text-davinci-003";
const DEFAULT_FREQUENCY_PENALTY = 0.1;
const DEFAULT_PRESENCE_PENALTY = 0.1;
const DEFAULT_OPTIONS = {
  model: DEFAULT_MODEL,
  max_tokens: DEFAULT_MAX_TOKENS,
  temperature: DEFAULT_TEMPERATURE,
  presence_penalty: DEFAULT_PRESENCE_PENALTY,
  frequency_penalty: DEFAULT_FREQUENCY_PENALTY,
};

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export class OpenAIService {
  public static getGoalsByCompanyDetails = async (
    companyDetails: CompanyDetails
  ): Promise<Array<string>> => {
    try {
      const { companyName, industry, country, companySize } = companyDetails;

      const prompt = `Generate 20 sustainability goal titles (up to 4-5 words) based on company details:
Company name: ${companyName}
Sector Industry: ${industry}
Country: ${country}
Company Size: ${companySize}

Goals:\n`;

      const options = {
        prompt,
        ...DEFAULT_OPTIONS,
      };
      const response = await openai.createCompletion(options);
      const goals = getGoalsByResponseString(response.data.choices[0].text);
      const shuffledGoals = shuffleArray(goals).slice(0, 10);
      return shuffledGoals as Array<string>;
    } catch (error) {
      console.error("OpenAIService.getGoalsByCompanyDetails: ", error);
      return [];
    }
  };

  public static getDescriptionsByGoals = async (
    goals: Array<string>,
    companyDetails: CompanyDetails
  ): Promise<Array<GoalDescription>> => {
    try {
      const { companyName, industry, country, companySize } = companyDetails;

      return await Promise.all(
        goals.map(async (goal: string) => {
          const prompt = `Generate sustainability goal description (up to 160 words) for the goal provided below based on company details:
Company name: ${companyName}
Sector Industry: ${industry}
Country: ${country}
Company Size: ${companySize}
Goal: ${goal}

Descriptions for the goal:\n`;

          const options = {
            prompt,
            ...DEFAULT_OPTIONS,
            temperature: 1,
          };
          const response = await openai.createCompletion(options);
          return {
            goal,
            description: response.data.choices[0].text,
          };
        })
      );
    } catch (error) {
      console.error("OpenAIService.getDescriptionsByGoals: ", error);
      return [];
    }
  };
}
