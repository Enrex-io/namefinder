type MessageDetails = {
  subject: string;
  content?: string;
  template?: string;
};

export enum EMAIL_TYPES {
  SEND_GOALS,
  SEND_GOALS_WITHOUT_TEMPLATE,
}

export const EMAIL_TYPES_MESSAGES: Record<EMAIL_TYPES, MessageDetails> = {
  [EMAIL_TYPES.SEND_GOALS]: {
    subject: "Generated goals",
    content: "Your goals here",
    template: "greengoalsai",
  },
  [EMAIL_TYPES.SEND_GOALS_WITHOUT_TEMPLATE]: {
    subject: "Generated goals",
    content: "Your goals here",
  },
};