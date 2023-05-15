import { AxiosError } from 'axios';
import { Description } from '.';

export const isDescription = (body: any): body is Description => {
  const { description } = body;
  return !!description;
};

export const isAxiosError = (error: any): error is AxiosError => {
  return !!error?.isAxiosError;
};
