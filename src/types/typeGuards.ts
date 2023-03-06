import { CompanyDetailsWithGoals } from "./index";
import { CompanyDetails } from ".";

export const isCompanyDetails = (body: any): body is CompanyDetails => {
  const { companyName, industry, country, companySize } = body;
  return !!companyName && !!industry && !!country && !!companySize;
};

export const isCompanyDetailsWithGoals = (
  body: any
): body is CompanyDetailsWithGoals => {
  const { goals, companyDetails } = body;
  return isCompanyDetails(companyDetails) && goals?.length;
};
