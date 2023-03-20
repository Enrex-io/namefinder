import { isAxiosError } from "./../types/typeGuards";
import {
  GoalDescription,
  ParsedCompanyDetails,
  ResponsePayload,
} from "@/types";
import axios, { AxiosError } from "axios";

const DEFAULT_ERROR_MESSAGE = "The AI service is experiencing high traffic. Please try again.";

const fetcher = axios.create({
  baseURL: "/api",
  method: "POST",
});

export class OpenAIApi {
  public static getGoalsByCompanyDetails = async (
    companyDetails: ParsedCompanyDetails
  ): Promise<ResponsePayload<Array<string>>> => {
    try {
      const response = await fetcher.post("/generateGoals", companyDetails);
      return { result: response.data.result };
    } catch (error: unknown) {
      console.error("OpenAIService.getGoalsByCompanyDetails: ", error);
      if (!isAxiosError(error)) return { error: DEFAULT_ERROR_MESSAGE };
      let errorMessage = DEFAULT_ERROR_MESSAGE;
      if (error.response?.status === 408) {
        errorMessage =
          "The AI service is experiencing high traffic. Please try again.";
      }
      if (error.response?.status === 429) {
        errorMessage = "Too many requests. Please try again later.";
      }
      return { error: errorMessage };
    }
  };

  public static getDescriptionsByGoals = async (
    goals: Array<string>,
    companyDetails: ParsedCompanyDetails
  ): Promise<ResponsePayload<Array<GoalDescription>>> => {
    try {
      const response = await fetcher.post("/generateDescriptions", {
        goals,
        companyDetails,
      });
      return { result: response.data.result };
    } catch (error: unknown) {
      console.error("OpenAIService.getDescriptionsByGoals: ", error);
      if (!isAxiosError(error)) return { error: DEFAULT_ERROR_MESSAGE };
      let errorMessage = DEFAULT_ERROR_MESSAGE;
      if (error.response?.status === 408) {
        errorMessage =
          "The AI service is experiencing high traffic. Please try again.";
      }
      if (error.response?.status === 429) {
        errorMessage = "Too many requests. Please try again later.";
      }
      return { error: errorMessage };
    }
  };
}
