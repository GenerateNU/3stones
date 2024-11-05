import { useQuery } from '@tanstack/react-query';
import { v4 as UUID } from 'uuid';
import axios from 'axios';

import { apiUrl } from './apiLinks';
import { Project } from '../types/project';
import { dumpAxiosError } from '../util/errors';

const getProject = async (id: string): Promise<Project | null> => {
  try {
    const response = await axios.get<Project>(`${apiUrl}/api/v1/projects/${id}`);
    return response.data; // Return the project if successful
  } catch (error) {
    dumpAxiosError(error);
    return null; // Return null if there's an error
  }
};

export const useProject = (id: string) => {
  const { data: project, isLoading } = useQuery<Project>({
    queryKey: ['project', id],
    queryFn: () => getProject(id),
  });

  return {
    project,
    isLoading,
  };
};

const getProjectTotalFunded = async (id: string): Promise<number | null> => {
  try {
    const response = await axios.get<number>(`${apiUrl}/api/v1/projects/${id}/total-funded`);
    return response.data; // Return the project if successful
  } catch (error) {
    dumpAxiosError(error);
    return null; // Return null if there's an error
  }
};

export const useProjectTotalFunded = (id: string) => {
  const { data: projectTotalFunded, isLoading } = useQuery<number>({
    queryKey: ['project_total_funded', id],
    queryFn: () => getProjectTotalFunded(id),
  });

  return {
    projectTotalFunded,
    isLoading,
  };
};
