export type ImageLink = {
  id: string;
  url: string;
};

export type Project = {
  id: string;
  developerId: string;
  title: string;
  description: string;
  completed: boolean;
  funding_goal_cents: number;
  milestone: string;
  premise: string;
  street: string;
  locality: string;
  state: string;
  zipcode: string;
  latitude: number;
  longitude: number;
  images: ImageLink[];
};

export type ProjectPost = {
  id: string;
  created_at: Date;
  project_id: string;
  title: string;
  description: string;
  images: ImageLink[];
};
