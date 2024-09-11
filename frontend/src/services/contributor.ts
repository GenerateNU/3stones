import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';

import { Contributor } from '../types/contributor';
import { API_URL } from './apiLinks';

const CONTRIBUTOR_URL = '/api/v1/contributors/';

export type ContributorQueryParams = {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
};

// Disable the linter checking for any since axios() returns any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAllContributors = async (): Promise<AxiosResponse<any, any>> => {
  return await axios({
    method: 'GET',
    url: `${API_URL}${CONTRIBUTOR_URL}`,
    headers: {
      Authorization: `${process.env.AUTH_TOKEN}`,
    },
  });
};

export const useAllContributors = () => {
  const { data: contributors, isLoading: contributorsAreLoading } = useQuery<
    // Disable the linter checking for any since axios() returns any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    AxiosResponse<any, any>
  >({
    queryKey: ['contributors'],
    queryFn: () => getAllContributors(),
  });

  return {
    contributors,
    contributorsAreLoading,
  };
};

const getContributor = async (id: string): Promise<Contributor> => {
  if (!parseInt(id)) {
    return {} as Contributor;
  }
  return await axios.get(`${API_URL}${CONTRIBUTOR_URL}${id}`);
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
