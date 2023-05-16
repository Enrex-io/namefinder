import { EMAIL_VALIDATION_REGEX } from '@/consts/regex';

export const validateDescription = (value: string) => {
  if (!value) return 'Description is required';
  if (value.length < 3)
    return "Description doesn't look like a realDescription";
  if (value.length > 2000) return 'Description is too big';
};

export const validateEmail = (value: string) => {
  if (!value) return 'Email is required';
  if (!value.match(EMAIL_VALIDATION_REGEX))
    return "Email doesn't look like a valid email";
};
