import { CompanyDetails, GoalDescription } from "@/types";
import axios from "axios";

const fetcher = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_API_URL,
  method: "POST",
});

export class OpenAIApi {
  public static getGoalsByCompanyDetails = async (
    companyDetails: CompanyDetails
  ): Promise<Array<string>> => {
    try {
      const response = await fetcher.post("/generateGoals", companyDetails);
      return response.data.result;
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
      const response = await fetcher.post("/generateDescriptions", {
        goals,
        companyDetails,
      });
      return response.data.result;
    } catch (error) {
      console.error("OpenAIService.getGoalsByCompanyDetails: ", error);
      return [];
    }
  };
}
