import axios, { AxiosError } from 'axios';

import { CLIENT_ID } from '../config';

export interface httpCallResponse {
    data?: unknown;
    error?: string;
    statusCode?: number;
    subCode?: number;
}

export const httpCall = async (url, method, headers = {}, data = {}): Promise<httpCallResponse> => {
    const jsonData = JSON.stringify(data);

    const config = {
        withCredentials: true,
        method: method,
        url: url,
        headers: {
            ...headers,
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'client-id': CLIENT_ID,
        },
        data: jsonData,
    };

    try {
        const response = await axios.request(config);
        return { data: response?.data };
    } catch (error) {
        console.log('httpCall', error);
        if (error instanceof AxiosError) {
            let errorMessage = 'Something went wrong. Please try again.';
            let subCode = 0;
            if (error.code === 'ERR_NETWORK') {
                errorMessage = 'Server is down. Please try again.';
                subCode = 1;
            } else if (error?.response?.data?.detail?.info) {
                errorMessage = error?.response?.data?.detail?.info;
            }
            return {
                error: errorMessage,
                statusCode: error?.response?.status,
                subCode: error?.response?.data?.detail?.code | subCode,
            };
        }
        throw error;
    }
};
