// import jsrp from '../jsrp';
import axios from 'axios';
import { Buffer } from 'buffer/';

import { getAuthClientDetails, getRSAPrivateKey, getSRPClient } from '../utils/security';

const baseUrl = 'http://localhost:8000/api/v1';
const clientId = 'b980b13c-4db8-4e8a-859c-4544fd70825f';

export const initateSignupProcess = async (email) => {
  try {
    var data = JSON.stringify({
      email: email,
    });
    var config = {
      method: 'post',
      url: `${baseUrl}/auth/signup`,
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
  email,
  password,
  verificationCode,
  firstName,
  lastName,
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
      url: `${baseUrl}/auth/signup/confirm`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'client-id': clientId,
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

const getSalt = (email) => {
  var data = JSON.stringify({
    email: email,
  });

  var config = {
    withCredentials: true,
    method: 'post',
    url: `${baseUrl}/auth/salt`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'client-id': clientId,
    },
    data: data,
  };
  return axios(config);
};

const initiateLogin = (email, clientPublicKey) => {
  var data = JSON.stringify({
    email: email,
    clientPublicKey: clientPublicKey,
  });

  var config = {
    withCredentials: true,
    method: 'post',
    url: `${baseUrl}/auth/login`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'client-id': clientId,
    },
    data: data,
  };
  return axios(config);
};

const confirmLogin = (email, clientProof) => {
  var data = JSON.stringify({
    email: email,
    clientProof: clientProof,
  });

  var config = {
    withCredentials: true,
    method: 'post',
    url: `${baseUrl}/auth/login/confirm`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'client-id': clientId,
    },
    data: data,
  };
  return axios(config);
};

export const loginUser = async (email, password) => {
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
    var config = {
      withCredentials: true,
      method: 'get',
      url: `${baseUrl}/auth/status`,
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
  var config = {
    withCredentials: true,
    method: 'post',
    url: `${baseUrl}/auth/logout`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };

  return axios(config);
};
