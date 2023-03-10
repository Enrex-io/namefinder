export enum SustainabilityGoalsReasons {
  SEEKING_KNOWLEDGE = "Seeking knowledge in sustainability",
  INTERESTED_IN_SUSTAINABLE_SOLUTIONS = "Find solutions to ensure our company sustainability",
  BEST_SUSTAINABILITY_PRACTICES = "Learn best sustainability practices",
  NOTIFY_NEW_SUSTAINABILY_TRENDS = "Get notified about new sustainability trends",
  NETWORK_WITH_OTHER = "Find other companies in sustainability field",
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
