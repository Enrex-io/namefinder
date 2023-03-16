import axios from "axios";
import { SustainabilityGoalsReasons } from '@/consts/sustainabilityGoalsReasons';

const fetcher = axios.create({
  baseURL: "/api",
});

export class MailchimpService {
  public static addSubscriber = async (
    email: string,
    companyName?: string,
    sectorIndustry?: string,
    country?: string,
    companySize?: string,
  ) => {
    try {
      const requestData = {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          COMP_NAME: companyName || "Unknown",
          SECT_INDUS: sectorIndustry || "Unknown",
          COUNTRY: country || "Unknown",
          COMP_SIZE: companySize || "Unknown",
        },
      };

      const response = await fetcher.post("/addSubscriber", requestData);
      return response.data;
    } catch (error) {
      console.error("Error adding subscriber to Mailchimp audience:", error);
    }
  };
  public static sendGoals = async (
    email: string,
    goalDescriptions: string,
  ) => {
    try {
      const requestData = {
        email_address: email,
        template_variables: [
          {
            name: 'FNAME',
            content: email,
          },
          {
            name: 'GOALS',
            content: goalDescriptions,
          }
        ]
      };

      const response = await fetcher.post("/sendGoals", requestData);
      return response.data;
    } catch (error) {
      console.error("Error sending generated goals by email:", error);
    }
  };
  public static updateTags = async (
    email: string,
    tags: (keyof typeof SustainabilityGoalsReasons)[],
  ) => {
    try {
      const response = await fetcher.post("/updateSubscriberTags", { email, tags });
      return response.data;
    } catch (error) {
      console.error("Error updating subscriber tags:", error);
    }
  };
}
