import { OpenAIService } from "@/services/OpenAIService.server";
import { CompanyDetails, GoalsResponsePayload } from "@/types";
import { isCompanyDetails } from "@/types/typeGuards";
import { limiter } from "@/utils/requestsLimiter";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GoalsResponsePayload>
) {
  await new Promise((resolve) => {
    limiter(req, res, async () => {
      const METHOD = req.method;
      const BODY = req.body;

      if (METHOD !== "POST") {
        res.status(405).json({ errors: ["Method not allowed"] });
        return;
      }

      if (!isCompanyDetails(BODY)) {
        res.status(400).json({ errors: ["Company details are required"] });
        return;
      }

      const companyDetails: CompanyDetails = BODY;
      const generatedResponse = await OpenAIService.getGoalsByCompanyDetails(
        companyDetails
      );
      resolve(res.status(200).json({ result: generatedResponse }));
    });
  });
}
