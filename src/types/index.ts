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
