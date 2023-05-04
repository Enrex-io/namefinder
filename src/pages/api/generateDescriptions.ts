import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAIApi } from '@/services/OpenAIService';
import { ResponsePayload } from '@/types';
import { isCompanyDetailsWithGoals } from '@/types/typeGuards';
import { applyTaskTimeout } from '@/utils/taskTimeout';
import { limiter } from '@/utils/requestsLimiter';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponsePayload>
) {
  await new Promise((resolve) => {
    limiter(req, res, async () => {
      const METHOD = req.method;
      const BODY = req.body;

      if (METHOD !== 'POST') {
        return resolve(res.status(405).json({ error: 'Method not allowed' }));
      }

      if (!isCompanyDetailsWithGoals(BODY)) {
        return resolve(
          res
            .status(400)
            .json({ error: 'Company details and goals are required' })
        );
      }

      const { goals, companyDetails } = BODY;
      const openAIServicePromise: Promise<ResponsePayload> =
        OpenAIApi.getDescriptionsByGoals(goals, {
          companyName: companyDetails.companyName,
          industry: companyDetails.industry,
          country: companyDetails.country.label,
          companySize: companyDetails.companySize,
        })
          .then((descriptions) => ({ result: descriptions }))
          .catch((error) => ({ error: error.message }));

      const result = await applyTaskTimeout(openAIServicePromise, () => ({
        error: 'Request timed out',
      }));

      const hasError = !!result.error;
      let status: number = hasError
        ? result.error === 'Request timed out'
          ? 408
          : 400
        : 200;

      return resolve(res.status(status).json(result));
    });
  });
}
