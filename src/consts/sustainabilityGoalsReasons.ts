export type FeedbackTags = "NEWSLETTER" | "DEMO" | "COLLABORATE";
export enum TagStatus {
  inactive = 'inactive',
  active = 'active',
};
export interface TagsToUpdate {
  name: FeedbackTags,
  status: TagStatus,
}

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
