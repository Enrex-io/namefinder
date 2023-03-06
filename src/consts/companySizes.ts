export enum CompanySizes {
  MICRO = "Micro 1-10 employees",
  SMALL = "Small 10 to 100 employees",
  MEDIUM = "Medium 100 to 500 employees",
  LARGE = "Large 500 to 1,000 employees",
  MULTINATIONAL = "Multinational more than 1,000 employees",
}

export const COMPANY_SIZE_OPTIONS = Object.keys(CompanySizes).map(
  (key: string) => ({
    label: CompanySizes[key as keyof typeof CompanySizes],
    value: key,
  })
);
