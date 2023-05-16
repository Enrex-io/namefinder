import { NextApiRequest, NextApiResponse } from 'next';
import { MailchimpService } from '@/services/Mailchimp.server';
import { createHash } from 'crypto';

export const md5 = (data: string) =>
  createHash('md5').update(data).digest('hex');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    email_address,
    merge_fields: { COUNTER },
  } = req.body;

  await MailchimpService.updateMergeField(email_address, COUNTER)
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(500).json(error));
}
