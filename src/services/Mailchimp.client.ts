import axios from 'axios';

const fetcher = axios.create({
  baseURL: '/api',
});

export class MailchimpService {
  public static addSubscriber = async (email: string, counter: number) => {
    try {
      const requestData = {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          COUNTER: counter,
        },
      };
      const response = await fetcher.post('/addSubscriber', requestData);
      return response.data;
    } catch (error) {
      console.error('Error adding subscriber to Mailchimp audience:', error);
    }
  };

  public static updateMergeField = async (email: string, counter: number) => {
    try {
      const requestData = {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          COUNTER: counter,
        },
      };
      const response = await fetcher.put('/updateMergeField', requestData);
      return response.data;
    } catch (error) {
      console.error('Error updating subscriber tags:', error);
    }
  };
}
