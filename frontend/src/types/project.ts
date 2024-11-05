import { DimensionValue } from 'react-native';
import { v4 as UUID } from 'uuid';

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
