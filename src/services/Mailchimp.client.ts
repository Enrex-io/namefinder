import axios from "axios";

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
    reasonForAIInterest?: string
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
          AI_REASON: reasonForAIInterest || "Unknown",
        },
      };

      const response = await fetcher.post("/addSubscriber", requestData);
      return response.data;
    } catch (error) {
      console.error("Error adding subscriber to Mailchimp audience:", error);
    }
  };
}
