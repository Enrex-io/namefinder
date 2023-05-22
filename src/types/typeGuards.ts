import { AxiosError } from 'axios';
import { Details } from '.';

export const isDescription = (body: any): body is Details => {
  const { description, region, media } = body;
  return !!description;
};

export const isAxiosError = (error: any): error is AxiosError => {
  return !!error?.isAxiosError;
};
