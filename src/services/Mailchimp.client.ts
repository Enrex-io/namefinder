import { TagsToUpdate } from '@/types';
import axios from 'axios';
const fetcher = axios.create({
  baseURL: '/api',
});

export class MailchimpService {
  public static addSubscriber = async (email: string, description?: string) => {
    try {
      const requestData = {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          DESCRIPTION: description || 'Unknown',
        },
      };

      const response = await fetcher.post('/addSubscriber', requestData);
      return response.data;
    } catch (error) {
      console.error('Error adding subscriber to Mailchimp audience:', error);
    }
  };
  public static sendDescription = async (
    email: string,
    description: string
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
            name: 'DESCRIPTION',
            content: description,
          },
        ],
      };

      const response = await fetcher.post('/sendDescription', requestData);
      return response.data;
    } catch (error) {
      console.error('Error sending generated goals by email:', error);
    }
  };
  public static updateTags = async (email: string, tags: TagsToUpdate) => {
    try {
      const response = await fetcher.post('/updateSubscriberTags', {
        email,
        tags,
      });
      return response.data;
    } catch (error) {
      console.error('Error updating subscriber tags:', error);
    }
  };
}
