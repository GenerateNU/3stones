import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { API_URL } from '../constants';
import { dumpAxiosError } from '../util/errors';
import { useAuth } from '../context/AuthContext';

// GET the investor's current profile
const getInvestorProfile = async (accessToken: string): Promise<InvestorProfile | null> => {
  try {
    const response = await axios.get<InvestorProfile>(`${API_URL}/api/v1/investors/profile`, {
      headers: {
        Authorization: `${accessToken}`,
      },
    });
    return response.data; // Return the project if successful
  } catch (error) {
    dumpAxiosError(error);
    return null; // Return null if there's an error
  }
};

export const useInvestorProfile = () => {
  const { session } = useAuth();

  const { data: profile, isLoading } = useQuery<InvestorProfile>({
    queryKey: ['investor_profile'],
    queryFn: () => getInvestorProfile(session?.access_token),
  });

  return {
    profile,
    isLoading,
  };
};

// GET investor's portfolio
const getInvestorPortfolio = async (accessToken: string): Promise<Portfolio | null> => {
  try {
    const response = await axios.get<Portfolio>(`${API_URL}/api/v1/investors/portfolio`, {
      headers: {
        Authorization: `${accessToken}`,
      },
    });
    return response.data; // Return the project if successful
  } catch (error) {
    dumpAxiosError(error);
    return null; // Return null if there's an error
  }
};



export const useInvestorPortfolio = () => {
  const { session } = useAuth();

  const { data: portfolio, isLoading } = useQuery<Portfolio>({
    queryKey: ['investor_portfolio'],
    queryFn: () => getInvestorPortfolio(session?.access_token),
  });

  return {
    portfolio,
    isLoading,
  };
};

// GET investor's history of transactions
const getInvestorHistory = async (accessToken: string): Promise<History | null> => {
  try {
    const response = await axios.get<History>(`${API_URL}/api/v1/investors/history`, {
      headers: {
        Authorization: `${accessToken}`,
      },
    });
    return response.data; // Return the project if successful
  } catch (error) {
    dumpAxiosError(error);
    return null; // Return null if there's an error
  }
};

export const useInvestorHistory = () => {
  const { session } = useAuth();

  const { data: history, isLoading } = useQuery<History>({
    queryKey: ['investor_portfolio'],
    queryFn: () => getInvestorHistory(session?.access_token),
  });

  return {
    history,
    isLoading,
  };
};
