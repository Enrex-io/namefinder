import { OpenAIService } from "@/services/OpenAIService.server";
import { GoalsDescriptionsResponsePayload } from "@/types";
import { isCompanyDetailsWithGoals } from "@/types/typeGuards";
import { limiter } from "@/utils/requestsLimiter";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GoalsDescriptionsResponsePayload>
) {
  await new Promise((resolve) => {
    limiter(req, res, async () => {
      const METHOD = req.method;
      const BODY = req.body;

      if (METHOD !== "POST") {
        res.status(405).json({ errors: ["Method not allowed"] });
        return;
      }

      if (!isCompanyDetailsWithGoals(BODY)) {
        res
          .status(400)
          .json({ errors: ["Company details and goals are required"] });
        return;
      }

      const { goals, companyDetails } = BODY;

      const generatedResponse = await OpenAIService.getDescriptionsByGoals(
        goals,
        companyDetails
      );
      resolve(res.status(200).json({ result: generatedResponse }));
    });
  });
}
