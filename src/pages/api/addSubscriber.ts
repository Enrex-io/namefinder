import { NextApiRequest, NextApiResponse } from "next";
import { MailchimpService } from "@/services/Mailchimp.server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    email_address,
    merge_fields: { COMP_NAME, SECT_INDUS, COUNTRY, COMP_SIZE, AI_REASON },
  } = req.body;

  await MailchimpService.addSubscriber(
    email_address,
    COMP_NAME,
    SECT_INDUS,
    COUNTRY,
    COMP_SIZE,
  )
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(500).json(error));
}
