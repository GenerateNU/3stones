
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { API_URL } from '../constants';
import { dumpAxiosError } from '../util/errors';
import { useAuth } from '../context/AuthContext';

const createLinkToken = async (accessToken: string): Promise<string | null> => {
    try {
        const response = await axios.post<{ link_token: string }>(
            `${API_URL}/api/v1/plaid/create_link_token`,
            {},
            {
                headers: {
                    Authorization: `${accessToken}`,
                },
            }
        );
        return response.data.link_token;
    } catch (error) {
        dumpAxiosError(error);
        return null;
    }
};

export const useLink = () => {
    const { session } = useAuth();

    const { data: linkToken, isLoading } = useQuery<string>({
        queryKey: ['plaid_link_token'],
        queryFn: () => createLinkToken(session?.access_token),
    });

    return {
        linkToken,
        isLoading,
    };
};
