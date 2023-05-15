import { Description } from '@/types';

export const delay = (fn: Function, ms: number, ...args: Array<unknown>) => {
  return setTimeout(fn, ms, ...args);
};

export const parsedescription = (values: Record<string, any>): Description => {
  return {
    description: values.description,
  };
};
