import { EMAIL_TYPES } from '@/consts/mail';
import { NextApiRequest, NextApiResponse } from "next";
import { MailchimpService } from "@/services/Mailchimp.server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    email_address,
  } = req.body;

  await MailchimpService.sendSingleMail(
    email_address,
    EMAIL_TYPES.SEND_GOALS_WITHOUT_TEMPLATE,
  )
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(500).json(error));
}
