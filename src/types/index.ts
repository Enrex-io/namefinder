export type Phone = `${number}` | `${number}-${number}`;
export type Label = Capitalize<string>;

export type Country = {
  code: Uppercase<string>;
  label: Label;
  phone: Phone;
  isSuggested?: boolean;
};

export type Industry = `${Label} - ${Label}`;

export interface Details {
  region: string;
  media: string;
  description: string;
}

export interface Feedback {
  email: string;
  COLLABORATE: boolean;
  NEWSLETTER: boolean;
  DEMO: boolean;
}

export type ResponsePayload<T = unknown> = {
  result?: T;
  error?: string;
};

export type FeedbackTags = 'NEWSLETTER' | 'DEMO' | 'COLLABORATE';
export enum TagStatus {
  inactive = 'inactive',
  active = 'active',
}

export enum FeedbackTagsEnum {
  NEWSLETTER = 'NEWSLETTER',
  DEMO = 'DEMO',
  COLLABORATE = 'COLLABORATE',
}
export interface TagsToUpdate {
  name: FeedbackTags;
  status: TagStatus;
}
