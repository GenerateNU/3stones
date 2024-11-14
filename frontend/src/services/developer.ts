import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { API_URL } from '../constants';
import { dumpAxiosError } from '../util/errors';
import { useAuth } from '../context/AuthContext';
import { Developer } from '../types/developer';

// GET all developers
const getDevelopers = async (accessToken: string): Promise<Developer[] | null> => {
  try {
    const response = await axios.get<Developer[]>(`${API_URL}/api/v1/developers/`, {
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

export const useDevelopers = () => {
  const { session } = useAuth();

  const { data: developers, isLoading } = useQuery<Developer[]>({
    queryKey: ['developers'],
    queryFn: () => getDevelopers(session?.access_token),
  });

  return {
    developers,
    isLoading,
  };
};

// GET developer by ID
const getDeveloper = async (developerId: string, accessToken: string): Promise<Developer | null> => {
  try {
    const response = await axios.get<Developer>(`${API_URL}/api/v1/developers/${developerId}`, {
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


export const useDeveloper = (developerId: string) => {
  const { session } = useAuth();

  const { data: developer, isLoading } = useQuery<Developer>({
    queryKey: ['developer'],
    queryFn: () => getDeveloper(developerId, session?.access_token),
  });

  return {
    developer,
    isLoading,
  };
};