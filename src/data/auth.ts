// import SRP from '@harshitsaini/srp-js';
import axios, { AxiosError, isAxiosError } from 'axios';
import { Buffer } from 'buffer/';
import { z } from 'zod';

import { BASE_URL, CLIENT_ID } from '../config';
import { UserAuthResponse } from '../schemas/user';
import { getAuthClientDetails, getRSAPrivateKey, getSRPClient } from '../utils/security';

interface httpCallResponse {
    data?: unknown;
    error?: string;
    statusCode?: number;
    subCode?: number;
}

const httpCall = async (url, method, headers = {}, data = {}): Promise<httpCallResponse> => {
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

    // console.log('httpCall.config', config);

    try {
        const response = await axios.request(config);
        return { data: response?.data };
    } catch (error) {
        console.log('httpCall', error);
        if (error instanceof AxiosError) {
            let errorMessage = 'Something went wrong. Please try again.';
            let subCode = 0
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

export const initateSignupProcess = async (email: string) => {
    try {
        const data = JSON.stringify({
            email: email,
        });
        const config = {
            method: 'post',
            url: `${BASE_URL}/auth/signup`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            data: data,
        };
        const response = await axios(config);
        return { response: response?.data || {} };
    } catch (error) {
        if (isAxiosError(error)) {
            const errorMessage =
                error?.response?.data?.detail?.info || `Something went wrong: ${error}.`;
            // throw Error(errorMessage);
            return { error: error };
        }
        throw error;
    }
};

export const completeSignupProcess = async (
    email: string,
    password: string,
    verificationCode: string,
    firstName: string,
    lastName: string,
) => {
    try {
        // generate verifier and salt
        const [salt, verifier]: [Buffer, Buffer] = await getAuthClientDetails(email, password).then(
            ([salt, verifier]) => {
                return [salt, verifier];
            },
        );

        const encryptedKeyWrappingKey = getRSAPrivateKey(password, true);

        const data = JSON.stringify({
            email: email,
            verificationCode: verificationCode,
            firstName: firstName,
            lastName: lastName,
            verifier: verifier.toString('hex'),
            salt: salt.toString('hex'),
            encryptedKeyWrappingKey: encryptedKeyWrappingKey,
        });

        const config = {
            withCredentials: true,
            method: 'post',
            url: `${BASE_URL}/auth/signup/confirm`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'client-id': CLIENT_ID,
            },
            data: data,
        };

        const response = await axios(config);
        return { response: response?.data || {} };
    } catch (error) {
        if (isAxiosError(error)) {
            const errorMessage =
                error?.response?.data?.detail?.info || `Something went wrong: ${error}.`;
            // throw Error(errorMessage);
            return { error: error };
        }
        throw error;
    }
};


export const getSalt = async (
    email: string,
): Promise<z.infer<typeof UserAuthResponse.getSalt.read> | httpCallResponse> => {
    const httpCallResponse = await httpCall(`${BASE_URL}/auth/salt`, 'post', {}, { email: email });

    if (httpCallResponse?.error) {
        return httpCallResponse;
    }
    return UserAuthResponse.getSalt.read.parse(httpCallResponse?.data);
};

const initiateLogin = async (
    email: string,
    clientPublicKey: string,
): Promise<z.infer<typeof UserAuthResponse.initiateLogin.read> | httpCallResponse> => {
    const httpCallResponse = await httpCall(
        `${BASE_URL}/auth/login`,
        'post',
        {},
        {
            email: email,
            clientPublicKey: clientPublicKey,
        },
    );
    if (httpCallResponse?.error) {
        return httpCallResponse;
    }

    return UserAuthResponse.initiateLogin.read.parse(httpCallResponse?.data);
};

const confirmLogin = async (email: string, clientProof: string) => {
    const httpCallResponse = await httpCall(
        `${BASE_URL}/auth/login/confirm`,
        'post',
        {},
        {
            email: email,
            clientProof: clientProof,
        },
    );
    if (httpCallResponse?.error) {
        return httpCallResponse;
    }

    return UserAuthResponse.confirmLogin.read.parse(httpCallResponse?.data);
};

export const loginUser = async (email: string, password: string) => {
    try {
        // Get salt from server
        const saltResponse = await getSalt(email);
        if (saltResponse?.error) {
            return saltResponse;
        }
        const { salt } = saltResponse;

        // Create SRP Client
        const client = await getSRPClient(email, password, salt);
        const clientPubliKey = client.computeA();
        console.log('clientPubliKey', typeof clientPubliKey, clientPubliKey, typeof client);

        // Send A to server and receive B
        const loginResponse = await initiateLogin(
            email,
            Buffer.from(clientPubliKey).toString('hex'),
        );

        if (loginResponse?.error) {
            return loginResponse;
        }

        const { serverPublicKey } = loginResponse;
        client.setB(Buffer.from(serverPublicKey, 'hex'));

        const clientProof = client.computeM1();

        // Share proofs and complete login
        const confirmLoginResponse = await confirmLogin(
            email,
            Buffer.from(clientProof).toString('hex'),
        );

        if (confirmLoginResponse?.error) {
            return confirmLoginResponse;
        }

        const { serverProof, keyWrappingKey } = confirmLoginResponse;

        if (client.checkM2(Buffer.from(serverProof, 'hex'))) {
            console.warn('Server verified!');
            return {
                response: { keyWrappingKey: keyWrappingKey },
            };
        } else {
            return { error: 'Server not verified!' };
        }
    } catch (error) {
        console.error("loginUser.error", error)
        throw error;
    }
};

export const getLoginStatus = async () => {
    const httpCallResponse = await httpCall(`${BASE_URL}/auth/status`, 'get');
    if (httpCallResponse?.error) {
        return httpCallResponse;
    }
    return UserAuthResponse.getLoginStatus.read.parse(httpCallResponse?.data);
};

export const logoutUser = () => {
    const config = {
        withCredentials: true,
        method: 'post',
        url: `${BASE_URL}/auth/logout`,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    };

    return axios(config);
};
