import { CompanySizes } from '@/consts/companySizes';
import { countries } from '@/consts/countries';
import { ParsedCompanyDetails } from '@/types';

export const shuffleArray = (array: Array<unknown>) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const delay = (fn: Function, ms: number, ...args: Array<unknown>) => {
  return setTimeout(fn, ms, ...args);
};

export const parseCompanyDetails = (values: Record<string, any>) : ParsedCompanyDetails => {
  return {
    companyName: values.companyName,
    industry: values.sectorAndIndustry,
    country:
      countries.find((country) => country.code === values.country)?.label ||
      values.country,
    companySize:
      CompanySizes[values.companySize as keyof typeof CompanySizes] ||
      values.companySize,
  };
}
