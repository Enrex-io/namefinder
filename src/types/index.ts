export type Phone = `${number}` | `${number}-${number}`;
export type Label = Capitalize<string>;

export type Country = {
  code: Uppercase<string>;
  label: Label;
  phone: Phone;
  isSuggested?: boolean;
};

export type Industry = `${Label} - ${Label}`;

export type Description = {
  description: string;
};

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

export type UserProfile = {
  id: string;
  photo: string | null;
  email: string | null;
  name: string | null;
  phone: string | null;
  isEmailVerified: boolean;
  token?: string,
  claims?: { [key: string]: any };
};