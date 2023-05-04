import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAIApi } from '@/services/OpenAIService';
import { CompanyDetails, ResponsePayload } from '@/types';
import { isCompanyDetails } from '@/types/typeGuards';
import { limiter } from '@/utils/requestsLimiter';
import { applyTaskTimeout } from '@/utils/taskTimeout';

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
      if (!isCompanyDetails(BODY)) {
        return resolve(
          res.status(400).json({ error: 'Company details are required' })
        );
      }

      const companyDetails: CompanyDetails = BODY;

      const openAIServicePromise: Promise<ResponsePayload> =
        OpenAIApi.getGoalsByCompanyDetails({
          companyName: companyDetails.companyName,
          industry: companyDetails.industry,
          country: companyDetails.country.label,
          companySize: companyDetails.companySize,
        })
          .then((goals) => ({ result: goals }))
          .catch((error) => ({ error: error.message }));

      const result = await applyTaskTimeout<ResponsePayload>(
        openAIServicePromise,
        () => ({ error: 'Request timed out' })
      );

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
