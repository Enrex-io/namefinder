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
  NEWSLETTER = "Sustainability newsletter",
  DEMO = "Greenifs registration and demo",
  COLLABORATE = "Partnership inquiry",
}

export const SUSTAINABILITY_GOALS_REASONS_OPTIONS = Object.entries(
  SustainabilityGoalsReasons
).map(([key, value]) => ({
  label: value,
  value: key,
  initialChecked: !(key === "COLLABORATE"),
}));
