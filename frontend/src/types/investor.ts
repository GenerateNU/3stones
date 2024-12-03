export type InvestorProfile = {
  first: string;
  last: string;
  email: string;
  phone_number: string;
  ssn: string;
  premise: string;
  street: string;
  locality: string;
  state: string;
  zipcode: string;
  pfp: string;
};

export type Portfolio = {
  [projectId: string]: number;
};

export type History = {
  [projectId: string]: number;
};

export type Investor = {
  first: string;
  last: string;
  id: string;
  investment_breakdown: Portfolio;
  total_investment_amount: number;
};
