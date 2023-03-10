export enum SustainabilityGoalsReasons {
  KNOWLEDGE = "Seeking knowledge in sustainability",
  SOLUTIONS = "Find solutions to ensure our company sustainability",
  BESTPRACTICES = "Learn best sustainability practices",
  NOTIFY = "Get notified about new sustainability trends",
  NETWORK = "Find other companies in sustainability field",
  OTHER = "Other",
  // UPDATES = "Receive updates on sustainability",
  // ACCESS = "Access exclusive resources",
  // LEARN = "Learn best practices",
  // CONNECT = "Connect with peers",
  // PARTICIPATE = "Participate in events",
  // DISCOUNT = "Receive discounts",
  // INFORM = "Stay informed",
  // FEEDBACK = "Provide feedback",
}

export const SUSTAINABILITY_GOALS_REASONS_OPTIONS = Object.entries(
  SustainabilityGoalsReasons
).map(([key, value]) => ({
  label: value,
  value: key,
}));
