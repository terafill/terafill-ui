// import jsrp from '../jsrp';
import axios from 'axios';
import { Buffer } from 'buffer/';

import { getAuthClientDetails, getRSAPrivateKey, getSRPClient } from '../utils/security';

const baseUrl = 'http://localhost:8000/api/v1'
const clientId = 'b980b13c-4db8-4e8a-859c-4544fd70825f'

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
    return {response: response?.data||{}}

    }
    catch(error) {
      const error_msg = error?.response?.data?.detail?.info || `Something went wrong: ${error}.`;
      return { error: error_msg }
    }
};

export const completeSignupProcess = async (
  email,
  password,
  verification_code,
  first_name,
  last_name,
) => {
  try {
    // generate verifier and salt
    const [salt, verifier] = await getAuthClientDetails(email, password)
      .then(([salt, verifier]) => {return [salt, verifier]})

    const encrypted_key_wrapping_key = getRSAPrivateKey(password, true);

    const data = JSON.stringify({
      email: email,
      verification_code: verification_code,
      first_name: first_name,
      last_name: last_name,
      verifier: verifier.toString('hex'),
      salt: salt.toString('hex'),
      encrypted_key_wrapping_key: encrypted_key_wrapping_key,
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
      return {response: response?.data||{}}
    }
    catch(error) {
      const error_msg = error?.response?.data?.detail?.info||`Something went wrong: ${error}.`;
      return { error: error_msg }
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

const initiateLogin = (email, clientPubliKey) => {
  var data = JSON.stringify({
    email: email,
    client_public_key: clientPubliKey,
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
    client_proof: clientProof,
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
    const salt_response = await getSalt(email);
    const { salt } = salt_response.data;

    // Create SRP Client
    const client = await getSRPClient(email, password, salt);
    const clientPubliKey = client.computeA();

    // Send A to server and receive B
    const login_response = await initiateLogin(email, Buffer.from(clientPubliKey).toString('hex'));
    const { server_public_key } = login_response.data;
    client.setB(Buffer.from(server_public_key, 'hex'));

    const clientProof = client.computeM1();

    // Share proofs and complete login
    const confirm_login_response = await confirmLogin(
      email,
      Buffer.from(clientProof).toString('hex'),
    );
    const { server_proof, key_wrapping_key } = confirm_login_response.data;
    if (client.checkM2(Buffer.from(server_proof, 'hex'))) {
      console.warn('Server verified!');
      return {
        response: {key_wrapping_key: key_wrapping_key},
      };
    } else {
      return {error: "Server not verified!"};
    }
    }
    catch(error) {
      const error_msg = error?.response?.data?.detail?.info||`Something went wrong: ${error}.`;
      return { error: error_msg }
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
    return {response: response?.data||{}}
  }
  catch(error) {
    const error_msg = error?.response?.data?.detail?.info||`Something went wrong: ${error}.`;
    return { error: error_msg }
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
