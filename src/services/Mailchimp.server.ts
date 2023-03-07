import axios from "axios";

const apiKey = process.env.MAILCHIMP_API_KEY;
const dataCenter = process.env.MAILCHIMP_DATA_CENTER;
const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

const apiUrl = `https://${dataCenter}.api.mailchimp.com/3.0/lists/${audienceId}/members`;

const fetcher = axios.create({
  headers: {
    Authorization: `apikey ${apiKey}`,
    "Content-Type": "application/json",
  },
});

export class MailchimpService {
  public static addSubscriber = async (
    email: string,
    companyName: string,
    sectorIndustry: string,
    country: string,
    companySize: string,
    reasonForAIInterest: string
  ) => {
    try {
      const requestData = {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          COMP_NAME: companyName,
          SECT_INDUS: sectorIndustry,
          COUNTRY: country,
          COMP_SIZE: companySize,
          AI_REASON: reasonForAIInterest,
        },
      };

      const response = await fetcher.post(apiUrl, requestData);
      return response.data;
    } catch (error) {
      console.error("Error adding subscriber to Mailchimp audience:", error);
    }
  };
}
