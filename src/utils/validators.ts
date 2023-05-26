import { MEDIAS_OPTIONS } from '@/consts/medias';
import { EMAIL_VALIDATION_REGEX } from '@/consts/regex';
import { REGIONS_OPTIONS } from '@/consts/region';

export const validateDescription = (value: string, maxChars: number) => {
  if (!value) return 'Text is required';
  if (value.length < 3)
    return "Description doesn't look like a realDescription";
  if (value.length > maxChars) return 'Text is too big';
};

export const validateRegion = (value: string) => {
  if (!value) return 'Regions are required';
  const foundValue = REGIONS_OPTIONS.find((option) => option.value === value);
  if (!foundValue) return "Regions don't match with options";
};

export const validateMedia = (value: string) => {
  if (!value) return 'Medias are required';
  const foundValue = MEDIAS_OPTIONS.find((option) => option.value === value);
  if (!foundValue) return "Medias don't match with options";
};
