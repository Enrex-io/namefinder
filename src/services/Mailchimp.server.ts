import { SustainabilityGoalsReasons } from '@/consts/sustainabilityGoalsReasons';
import mailchimp, {
  ApiClient,
  MergeVar,
  MessagesSendRequest,
} from "@mailchimp/mailchimp_transactional";
import clientMarketing, { Status } from "@mailchimp/mailchimp_marketing";
import { EMAIL_TYPES, EMAIL_TYPES_MESSAGES } from "@/consts/mail";
import { md5 } from "@/utils/helpers";

const DEFAULT_SENDER_EMAIL = "no-reply@greenifs.com";
const apiKeyMarketing = process.env.MAILCHIMP_API_KEY;
const apiKeyTransactional = process.env.MAILCHIMP_API_KEY;
const apiKeyMandrill = process.env.MANDRILL_API_KEY;
const dataCenter = process.env.MAILCHIMP_DATA_CENTER;
const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

clientMarketing.setConfig({
  apiKey: apiKeyMarketing,
  server: dataCenter,
});

export class MailchimpService {
  private static clientTransactional: ApiClient = mailchimp(apiKeyTransactional || '');
  private static clientMandrill: ApiClient = mailchimp(apiKeyMandrill || '');
  private static clientMarketing = clientMarketing;

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

    const response = await this.clientMarketing.lists.addListMember(audienceId || '', requestData);

    return response;
  };

  public static updateSubscriberTags = async (
    email: string,
    tags: keyof typeof SustainabilityGoalsReasons
  ) => {
    const formattedTags = [{name: "NEWSLETTER", status: "active"}];
    const response = await this.clientMarketing.lists.updateListMemberTags(audienceId || '', md5(email), { tags: formattedTags });
    return response;
  };

  public static async sendSingleMail(
    receiver: string,
    emailType: EMAIL_TYPES,
    customContent?: string
  ): Promise<void> {
    const { subject, content } = EMAIL_TYPES_MESSAGES[emailType];
    if (!content && !customContent) {
      throw new Error("No content for the email was provided");
    }
    const request: MessagesSendRequest = {
      message: {
        from_email: DEFAULT_SENDER_EMAIL,
        to: [{ email: receiver }],
        subject,
        text: customContent || content,
      },
    };

    const res = await this.clientTransactional.messages.send(request);

    if (res instanceof Error) {
      throw new Error('Mailchimp service error', res);
    }
  }

  public static async sendSingleTemplate(
    receiver: string,
    emailType: EMAIL_TYPES,
    templateVariables: MergeVar[]
  ): Promise<void> {
    const { subject, template } = EMAIL_TYPES_MESSAGES[emailType];

    if (!template) throw new Error("No template was provided");

    const res = await this.clientMandrill.messages.sendTemplate({
      template_name: template,
      message: {
        from_email: DEFAULT_SENDER_EMAIL,
        to: [{ email: receiver }],
        subject,
        merge_vars: [
          {
            rcpt: receiver,
            vars: templateVariables,
          },
        ],
      },
      template_content: [],
    });

    if (res instanceof Error) {
      throw new Error('Mailchimp service error', res);
    }
  }
}
