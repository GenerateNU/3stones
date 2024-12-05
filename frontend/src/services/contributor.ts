import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { API_URL } from '../constants';
import { dumpAxiosError } from '../util/errors';
import { useAuth } from '../context/AuthContext';
import { Contributor } from '../types/contributor';

// GET all contributors
const getContributors = async (accessToken: string): Promise<Contributor[] | null> => {
  try {
    const response = await axios.get<Contributor[]>(`${API_URL}/api/v1/contributors/`, {
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

export const useContributors = () => {
  const { session } = useAuth();

  const { data: contributors, isLoading } = useQuery<Contributor[]>({
    queryKey: ['contributors'],
    queryFn: () => getContributors(session?.access_token),
  });

  return {
    contributors,
    isLoading,
  };
};
