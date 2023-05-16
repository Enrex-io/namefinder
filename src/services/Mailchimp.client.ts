import axios from 'axios';

const fetcher = axios.create({
  baseURL: '/api',
});

export class MailchimpService {
  public static addSubscriber = async (email: string, counter: string) => {
    try {
      const requestData = {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          Counter: counter,
        },
      };

      console.log(requestData);

      const response = await fetcher.post('/addSubscriber', requestData);
      return response.data;
    } catch (error) {
      console.error('Error adding subscriber to Mailchimp audience:', error);
    }
  };

  public static updateMergeField = async (email: string, counter: string) => {
    try {
      const requestData = {
        email,
        Counter: counter,
      };
      const response = await fetcher.post('/updateMergeField', requestData);
      return response.data;
    } catch (error) {
      console.error('Error updating subscriber tags:', error);
    }
  };
}
