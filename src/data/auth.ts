import axios from 'axios';
import { Buffer } from 'buffer/';

import { BASE_URL, CLIENT_ID } from '../config';
import { getAuthClientDetails, getRSAPrivateKey, getSRPClient } from '../utils/security';

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
    const errorMessage = error?.response?.data?.detail?.info || `Something went wrong: ${error}.`;
    return { error: errorMessage };
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
    const [salt, verifier] = await getAuthClientDetails(email, password).then(
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
    const errorMessage = error?.response?.data?.detail?.info || `Something went wrong: ${error}.`;
    return { error: errorMessage };
  }
};

const getSalt = (email: string) => {
  const data = JSON.stringify({
    email: email,
  });

  const config = {
    withCredentials: true,
    method: 'post',
    url: `${BASE_URL}/auth/salt`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'client-id': CLIENT_ID,
    },
    data: data,
  };
  return axios(config);
};

const initiateLogin = (email: string, clientPublicKey: string) => {
  const data = JSON.stringify({
    email: email,
    clientPublicKey: clientPublicKey,
  });

  const config = {
    withCredentials: true,
    method: 'post',
    url: `${BASE_URL}/auth/login`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'client-id': CLIENT_ID,
    },
    data: data,
  };
  return axios(config);
};

const confirmLogin = (email: string, clientProof: string) => {
  const data = JSON.stringify({
    email: email,
    clientProof: clientProof,
  });

  const config = {
    withCredentials: true,
    method: 'post',
    url: `${BASE_URL}/auth/login/confirm`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'client-id': CLIENT_ID,
    },
    data: data,
  };
  return axios(config);
};

export const loginUser = async (email: string, password: string) => {
  try {
    // Get salt from server
    const saltResponse = await getSalt(email);
    const { salt } = saltResponse.data;

    // Create SRP Client
    const client = await getSRPClient(email, password, salt);
    const clientPubliKey = client.computeA();

    // Send A to server and receive B
    const loginResponse = await initiateLogin(email, Buffer.from(clientPubliKey).toString('hex'));
    const { serverPublicKey } = loginResponse.data;
    client.setB(Buffer.from(serverPublicKey, 'hex'));

    const clientProof = client.computeM1();

    // Share proofs and complete login
    const confirmLoginResponse = await confirmLogin(
      email,
      Buffer.from(clientProof).toString('hex'),
    );
    const { serverProof, keyWrappingKey } = confirmLoginResponse.data;
    if (client.checkM2(Buffer.from(serverProof, 'hex'))) {
      console.warn('Server verified!');
      return {
        response: { keyWrappingKey: keyWrappingKey },
      };
    } else {
      return { error: 'Server not verified!' };
    }
  } catch (error) {
    const errorMessage = error?.response?.data?.detail?.info || `Something went wrong: ${error}.`;
    return { error: errorMessage };
  }
};

export const getLoginStatus = async () => {
  try {
    const config = {
      withCredentials: true,
      method: 'get',
      url: `${BASE_URL}/auth/status`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    const response = await axios(config);
    return { response: response?.data || {} };
  } catch (error) {
    const errorMessage = error?.response?.data?.detail?.info || `Something went wrong: ${error}.`;
    return { error: errorMessage };
  }
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
