import { COMPANY_SIZE_OPTIONS } from "@/consts/companySizes";
import { COUNTRY_OPTIONS } from "@/consts/countries";
import { INDUSTRY_OPTIONS } from "@/consts/industries";
import { EMAIL_VALIDATION_REGEX } from "@/consts/regex";
import { SUSTAINABILITY_GOALS_REASONS_OPTIONS } from "@/consts/sustainabilityGoalsReasons";

export const validateCompanyName = (value: string) => {
  if (!value) return "Company name is required";
  if (value.length < 3)
    return "Company name doesn't look like a real company name";
};

export const validateSectorAndIndustry = (value: string) => {
  if (!value) return "Sector and industry is required";
  const foundValue = INDUSTRY_OPTIONS.find((option) => option.value === value);
  if (!foundValue) return "Sector and industry don't match with options";
};

export const validateCountry = (value: string) => {
  if (!value) return "Country is required";
  const foundValue = COUNTRY_OPTIONS.find((option) => option.value === value);
  if (!foundValue) return "Country doesn't match with options";
};

export const validateCompanySize = (value: string) => {
  if (!value) return "Company size is required";
  const foundValue = COMPANY_SIZE_OPTIONS.find(
    (option) => option.value === value
  );
  if (!foundValue) return "Company size doesn't match with options";
};

export const validateEmail = (value: string) => {
  if (!value) return "Email is required";
  if (!value.match(EMAIL_VALIDATION_REGEX))
    return "Email doesn't look like a valid email";
};

export const validateReason = (value: {label: string, value: string }[]) => {
  console.log('validation time value:');
  console.log(value);
  if (!value) return "Reason is required";
  const found = value.every(({ value }) => {
    return SUSTAINABILITY_GOALS_REASONS_OPTIONS.some((option) => option.value === value)
  })

  if (!found) return "Reason doesn't match with options";
};
