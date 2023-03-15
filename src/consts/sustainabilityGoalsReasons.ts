export enum SustainabilityGoalsReasons {
  NEWSLETTER = "Get weekly/monthly updates",
  DEMO = "Greenifs registration and demo",
  COLLABORATE = "Partnering for sustainability",
}

export const SUSTAINABILITY_GOALS_REASONS_OPTIONS = Object.entries(
  SustainabilityGoalsReasons
).map(([key, value]) => ({
  label: value,
  value: key,
}));
