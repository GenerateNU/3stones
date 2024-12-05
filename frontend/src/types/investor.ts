export type InvestorProfile = {
  first: string;
  last: string;
  email: string;
  phone_number: string;
  ssn: string;
  premise: string;
  subpremise: string;
  street: string;
  locality: string;
  state: string;
  zipcode: string;
  profile_picture_url: string;
};

export type Portfolio = {
  [projectId: string]: number;
};

export type HistoryEntry = {
  created_at: string;
  project_id: string;
  funded_cents: number;
};

export type History = HistoryEntry[];

export type Investor = {
  id: string;
  profile: InvestorProfile;
  total_investment_amount: number;
  cash_balance: number;
  investment_breakdown: Portfolio;
};
