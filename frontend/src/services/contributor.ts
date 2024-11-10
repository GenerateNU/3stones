import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Contributor } from '../types/contributor';
import { API_URL } from '../constants';

export type ContributorQueryParams = {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
};

const getContributor = async (id: string): Promise<Contributor> => {
  if (!parseInt(id)) {
    return {} as Contributor;
  }
  return await axios.get(`${API_URL}/contributor/${id}`);
};

export const useContributorById = (id: string) => {
  const { data: contributor, isLoading: contributorIsLoading } = useQuery<Contributor>({
    queryKey: ['contributor', id],
    queryFn: () => getContributor(id),
  });

  return {
    contributor,
    contributorIsLoading,
  };
};
