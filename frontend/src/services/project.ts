import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Contributor } from '../types/contributor';
import { apiUrl } from './apiLinks';

export type ContributorQueryParams = {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
};

const getProjectById = async (id: string): Promise<Project> => {
    return await axios.get(`${apiUrl}/api/v1/project/${id}`)
}

export const useProjectById = (id: string) => {
  const { data: project, isLoading } = useQuery<Contributor>({
    queryKey: ['contributor', id],
    queryFn: asy() => {
        const result = await axios.get(`${apiUrl}/api/v1/project/${id}`);

    },
  });

  return {
    contributor,
    contributorIsLoading,
  };
};
