import { NextApiRequest, NextApiResponse } from "next";
import { MailchimpService } from "@/services/Mailchimp.server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    email_address,
    tags,
  } = req.body;

  await MailchimpService.updateSubscriberTags(
    email_address,
    tags
  )
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(500).json(error));
}
