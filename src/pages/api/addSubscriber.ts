import { NextApiRequest, NextApiResponse } from 'next';
import { MailchimpService } from '@/services/Mailchimp.server';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    email_address,
    merge_fields: { Counter },
  } = req.body;

  await MailchimpService.addSubscriber(email_address, Counter)
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(500).json(error));
}
