// import SRP from '@harshitsaini/srp-js';
import { Buffer } from 'buffer/';
import { z } from 'zod';

import { httpCallResponse, httpCall } from './httpCallFacade';
import { BASE_URL } from '../config';
import { UserAuthResponse } from '../schemas/user';
import { getAuthClientDetails, getRSAPrivateKey, getSRPClient } from '../utils/security';

export const initateSignupProcess = async (email: string) => {
    const httpCallResponse = await httpCall(
        `${BASE_URL}/auth/signup`,
        'post',
        {},
        { email: email },
    );

    if (httpCallResponse?.error) {
        return httpCallResponse;
    }
    return {};
};

export const completeSignupProcess = async (
    email: string,
    password: string,
    verificationCode: string,
    firstName: string,
    lastName: string,
) => {
    // generate verifier and salt
    const [salt, verifier]: [Buffer, Buffer] = await getAuthClientDetails(email, password).then(
        ([salt, verifier]) => {
            return [salt, verifier];
        },
    );

    const encryptedKeyWrappingKey = getRSAPrivateKey(password, true);

    const data = {
        email: email,
        verificationCode: verificationCode,
        firstName: firstName,
        lastName: lastName,
        verifier: verifier.toString('hex'),
        salt: salt.toString('hex'),
        encryptedKeyWrappingKey: encryptedKeyWrappingKey,
    };

    const httpCallResponse = await httpCall(`${BASE_URL}/auth/signup/confirm`, 'post', {}, data);

    if (httpCallResponse?.error) {
        return httpCallResponse;
    }
    return {};
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
                data: { keyWrappingKey: keyWrappingKey },
            };
        } else {
            return { error: 'Server not verified!' };
        }
    } catch (error) {
        console.error('loginUser.error', error);
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

export const logoutUser = async () => {
    const httpCallResponse = await httpCall(`${BASE_URL}/auth/logout`, 'post');
    if (httpCallResponse?.error) {
        return httpCallResponse;
    }
    return {};
};
