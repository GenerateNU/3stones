import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { API_URL } from '../constants';
import { Project, ProjectPost } from '../types/project';
import { dumpAxiosError } from '../util/errors';
import { useAuth } from '../context/AuthContext';

const getProject = async (id: string, accessToken: string): Promise<Project | null> => {
  try {
    const response = await axios.get<Project>(`${API_URL}/api/v1/projects/${id}`, {
      headers: {
        Authorization: `${accessToken}`,
      }
    });
    return response.data; // Return the project if successful
  } catch (error) {
    dumpAxiosError(error);
    return null; // Return null if there's an error
  }
};

export const useProject = (id: string) => {
  const { session } = useAuth();
  
  const { data: project, isLoading } = useQuery<Project>({
    queryKey: ['project', id],
    queryFn: () => getProject(id, session?.access_token),
  });

  return {
    project,
    isLoading,
  };
};

const getProjectTotalFunded = async (id: string, accessToken: string): Promise<number | null> => {
  try {
    const response = await axios.get<number>(`${API_URL}/api/v1/projects/${id}/total-funded`, {
      headers: {
        Authorization: `${accessToken}`,
      }
    });
    return response.data; // Return the project if successful
  } catch (error) {
    dumpAxiosError(error);
    return null; // Return null if there's an error
  }
};



export const useProjectTotalFunded = (id: string) => {
  const { session } = useAuth();
  const { data: projectTotalFunded, isLoading } = useQuery<number>({
    queryKey: ['project_total_funded', id],
    queryFn: () => getProjectTotalFunded(id, session?.access_token),
  });

  return {
    projectTotalFunded,
    isLoading,
  };
};

// GET all projects !!!! Backend endpoint doesn't exist?
const getAllProjects = async (accessToken): Promise<Project[] | null> => {
  try {
    const response = await axios.get<Project[]>(`${API_URL}/api/v1/projects/`, {
      headers: {
        Authorization: `${accessToken}`,
      }
    });
    return response.data; // Return the project if successful
  } catch (error) {
    dumpAxiosError(error);
    return null; // Return null if there's an error
  }
};

export const useAllProjects = () => {
  const { session } = useAuth();
  const { data: allProjects, isLoading } = useQuery<Project[]>({
    queryKey: ['all_projects'],
    queryFn: () => getAllProjects(session?.access_token),
  });
  return {
    allProjects,
    isLoading,
  };
};

// POST an investment
const postInvestment = async (
  projectId: string, 
  amount: number, 
  accessToken: string
): Promise<void> => {
  try {
    await axios.post(
      `${API_URL}/api/v1/projects/${projectId}/invest`,
      { amount },
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      }
    );
  } catch (error) {
    dumpAxiosError(error);
    throw error;
  }
};

// returns a mutation object that can be used to post the investment
// To implement: 
// const { triggerPostInvestment, isLoading, error } = await usePostInvestment(projectId);
// triggerPostInvestment(amount);
export const usePostInvestment = (projectId: string) => {
  const { session } = useAuth();

  const mutation = useMutation({
    mutationFn: (amount: number) => 
      postInvestment(projectId, amount, session?.access_token),
  });
  return {
    triggerPostInvestment: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};


// GET a project's posts
const getProjectPosts = async (projectId, accessToken): Promise<ProjectPost[] | null> => {
  try {
    const response = await axios.get<ProjectPost[]>(`${API_URL}/api/v1/projects/${projectId}/posts`, {
      headers: {
        Authorization: `${accessToken}`,
      }
    });
    return response.data; // Return the project if successful
  } catch (error) {
    dumpAxiosError(error);
    return null; // Return null if there's an error
  }
};

export const useProjectPosts = (projectId: string) => {
  const { session } = useAuth();
  const { data: projectPosts, isLoading } = useQuery<ProjectPost[]>({
    queryKey: ['project_posts'],
    queryFn: () => getProjectPosts(projectId, session?.access_token),
  });
  return {
    projectPosts,
    isLoading,
  };
};

