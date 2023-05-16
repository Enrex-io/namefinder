import mailchimp, {
  ApiClient,
  MergeVar,
  MessagesSendRequest,
} from '@mailchimp/mailchimp_transactional';
import clientMarketing, { Status } from '@mailchimp/mailchimp_marketing';
import { EMAIL_TYPES, EMAIL_TYPES_MESSAGES } from '@/consts/mail';
import { TagsToUpdate } from '@/types';

const DEFAULT_SENDER_EMAIL = 'no-reply@greenifs.com';
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
  private static clientTransactional: ApiClient = mailchimp(
    apiKeyTransactional || ''
  );
  private static clientMandrill: ApiClient = mailchimp(apiKeyMandrill || '');
  private static clientMarketing = clientMarketing;

  public static addSubscriber = async (email: string, counter: number) => {
    const requestData = {
      email_address: email,
      status: 'subscribed' as Status,
      merge_fields: {
        COUNTER: counter,
      },
    };

    const response = await this.clientMarketing.lists.addListMember(
      audienceId || '',
      requestData
    );

    return response;
  };

  public static updateMergeField = async (email: string, counter: string) => {
    const response = await this.clientMarketing.lists.setListMember(
      audienceId || '',
      email,
      {
        email_address: email,
        status_if_new: 'subscribed' as Status,
        merge_fields: {
          COUNTER: counter,
        },
      }
    );
    return response;
  };
}
