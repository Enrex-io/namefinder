import { CompanySizes } from "@/consts/companySizes";

export type Phone = `${number}` | `${number}-${number}`;
export type Label = Capitalize<string>;

export type Country = {
  code: Uppercase<string>;
  label: Label;
  phone: Phone;
  isSuggested?: boolean;
};

export type Industry = `${Label} - ${Label}`;

export type CompanyDetails = {
  companyName: string;
  companySize: CompanySizes;
  industry: Industry;
  country: Country;
};

export type Goal = {
  name: Lowercase<`${string}-${string}`>;
  label: Label;
};

export type GoalDescription = {
  goal: string;
  description: string;
};

export type CompanyDetailsWithGoals = {
  goals: Array<string>;
  companyDetails: CompanyDetails;
};

export type GoalsResponsePayload = {
  result?: Array<string>;
  errors?: Array<string>;
};

export type GoalsDescriptionsResponsePayload = {
  result?: Array<GoalDescription>;
  errors?: Array<string>;
};

export type Feedback = {
  email: string;
  reason: string;
};
