type MessageDetails = {
  subject: string;
  content?: string;
  template?: string;
};

export enum EMAIL_TYPES {
  SEND_GOALS,
}

export const EMAIL_TYPES_MESSAGES: Record<EMAIL_TYPES, MessageDetails> = {
  [EMAIL_TYPES.SEND_GOALS]: {
    subject: "Generated goals",
    content: "Your goals here",
    template: "greengoalsai",
  },
};