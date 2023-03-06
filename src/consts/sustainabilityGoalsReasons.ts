export enum SustainabilityGoalsReasons {
  UPDATES = "Receive updates on sustainability",
  ACCESS = "Access exclusive resources",
  LEARN = "Learn best practices",
  CONNECT = "Connect with peers",
  PARTICIPATE = "Participate in events",
  NOTIFY = "Get notifications",
  DISCOUNT = "Receive discounts",
  INFORM = "Stay informed",
  FEEDBACK = "Provide feedback",
  NETWORK = "Network with others",
  OTHER = "Other",
}

export const SUSTAINABILITY_GOALS_REASONS_OPTIONS = Object.entries(
  SustainabilityGoalsReasons
).map(([key, value]) => ({
  label: value,
  value: key,
}));
