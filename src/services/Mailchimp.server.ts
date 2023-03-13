import axios from "axios";
// import mailchimp, {
//   ApiClient,
//   MergeVar,
//   MessagesSendRequest,
// } from "@mailchimp/mailchimp_transactional";
import client, { Status } from "@mailchimp/mailchimp_marketing";
import { EMAIL_TYPES, EMAIL_TYPES_MESSAGES } from "@/consts/mail";

const DEFAULT_SENDER_EMAIL = "no-reply@greenifs.com";
const apiKey = process.env.MAILCHIMP_API_KEY;
const dataCenter = process.env.MAILCHIMP_DATA_CENTER;
const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

client.setConfig({
  apiKey,
  server: dataCenter,
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
    const requestData = {
      email_address: email,
      status: "subscribed" as Status,
      merge_fields: {
        COMP_NAME: companyName,
        SECT_INDUS: sectorIndustry,
        COUNTRY: country,
        COMP_SIZE: companySize,
        AI_REASON: reasonForAIInterest,
      },
    };

    const response = await client.lists.addListMember(audienceId || '', requestData);

    return response;
  };

  // public static async sendSingleMail(
  //   receiver: string,
  //   emailType: EMAIL_TYPES,
  //   customContent?: string
  // ): Promise<void> {
  //   try {
  //     const { subject, content } = EMAIL_TYPES_MESSAGES[emailType];
  //     if (!content && !customContent) {
  //       throw new Error("No content for the email was provided");
  //     }
  //     const request: MessagesSendRequest = {
  //       message: {
  //         from_email: DEFAULT_SENDER_EMAIL,
  //         to: [{ email: receiver }],
  //         subject,
  //         text: customContent || content,
  //       },
  //     };
  //     await this.client.messages.send(request);
  //   } catch (error: unknown) {
  //     console.error("error", { error });
  //   }
  // }

  // public static async sendSingleTemplate(
  //   receiver: string,
  //   emailType: EMAIL_TYPES,
  //   templateVariables: MergeVar[]
  // ): Promise<void> {
  //   try {
  //     const { subject, template } = EMAIL_TYPES_MESSAGES[emailType];

  //     if (!template) throw new Error("No template was provided");

  //     await this.client.messages.sendTemplate({
  //       template_name: template,
  //       message: {
  //         from_email: DEFAULT_SENDER_EMAIL,
  //         to: [{ email: receiver }],
  //         subject,
  //         merge_vars: [
  //           {
  //             rcpt: receiver,
  //             vars: templateVariables,
  //           },
  //         ],
  //       },
  //       template_content: [],
  //     });
  //   } catch (error: unknown) {
  //     logger.error("error", { error });
  //   }
  // }
}
