
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { API_URL } from '../constants';
import { dumpAxiosError } from '../util/errors';
import { useAuth } from '../context/AuthContext';
import { TransactionInfo } from '../types/plaid';

export const invest = async (accessToken: string, property_id: string, amount_cents: number): Promise<TransactionInfo | null> => {
    try {
        const response = await axios.post<TransactionInfo>(
            `${API_URL}/api/v1/plaid/invest`,
            {
                property_id: property_id,
                amount: amount_cents.toString()
            },
            {
                headers: {
                    Authorization: `${accessToken}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        dumpAxiosError(error);
        return null;
    }
}

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

