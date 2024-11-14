import { useQuery } from '@tanstack/react-query';
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

const getProjectTotalFunded = async (id: string): Promise<number | null> => {
  try {
    const response = await axios.get<number>(`${API_URL}/api/v1/projects/${id}/total-funded`);
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

// GET all projects
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
const postInvestment = async (projectId: string, amount: number, accessToken: string): Promise<void> => {
  try {
    await axios.post(
      `${API_URL}/api/v1/projects/${projectId}/investments`,
      { amount: amount },
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      }
    );
  } catch (error) {
    dumpAxiosError(error);
  }
};

export const usePostInvestment = (projectId: string, amount: number) => {
  const { session } = useAuth();
  const { data: postInvestmentMutation, isLoading } = useQuery({
    queryKey: ['all_projects'],
    queryFn: () => postInvestment(projectId, amount, session?.access_token),
  });

  return {
    postInvestmentMutation,
    isLoading,
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

export const useProjectPosts = (projectId: number) => {
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

