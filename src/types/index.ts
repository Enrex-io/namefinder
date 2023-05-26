import Regions from "@/consts/region";
import Medias from "@/consts/medias";

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

export interface IPrompt {
  userId: string;
  media: Medias;
  region: Regions;
  request: string;
  response: {
    terms: string[];
    correctText: string;
  }
}