export type InvestorProfile = {
  first: string;
  last: string;
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
  cash_balance: number;
};
