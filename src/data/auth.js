// import jsrp from '../jsrp';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Buffer } from 'buffer/';

import { getAuthClientDetails, getVDEK, getRSAPrivateKey, getSRPClient } from "../utils/security";

export const initateSignupProcess = (email) => {
  var data = JSON.stringify({
    email: email,
  });
  var config = {
    method: 'post',
    url: `http://localhost:8000/api/v1/auth/signup`,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    data: data
  }
  return axios(config);
}


export const completeSignupProcess =  async (
  email,
  password,
  verification_code,
  first_name,
  last_name,
  ) => {
  // generate verifier and salt
  getAuthClientDetails(email, password).then(([salt, verifier]) => {
      const encrypted_key_wrapping_key = getRSAPrivateKey(password, true);

      const data = JSON.stringify({
        email: email,
        verification_code: verification_code,
        first_name: first_name,
        last_name: last_name,
        verifier: verifier.toString('hex'),
        salt: salt.toString('hex'),
        encrypted_key_wrapping_key: encrypted_key_wrapping_key
      });

      const config = {
        withCredentials: true,
        method: 'post',
        url: `http://localhost:8000/api/v1/auth/signup/confirm`,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'client-id': 'b980b13c-4db8-4e8a-859c-4544fd70825f',
        },
        data : data
      };

      return axios(config);
  }).catch(err => {
      console.error(err);
      return null
  });
}

const getSalt = (email) => {
  var data = JSON.stringify({
    email: email,
  });

  var config = {
    withCredentials: true,
    method: 'post',
    url: `http://localhost:8000/api/v1/auth/salt`,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'client-id': 'b980b13c-4db8-4e8a-859c-4544fd70825f',
    },
    data : data
  };
  return axios(config);
}

const initiateLogin = (email, clientPubliKey) => {
  var data = JSON.stringify({
    email: email,
    client_public_key: clientPubliKey
  });

  var config = {
    withCredentials: true,
    method: 'post',
    url: `http://localhost:8000/api/v1/auth/login`,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'client-id': 'b980b13c-4db8-4e8a-859c-4544fd70825f',
    },
    data : data
  };
  return axios(config);
}

const confirmLogin = (email, clientProof) => {
  var data = JSON.stringify({
    email: email,
    client_proof: clientProof,
  });

  var config = {
    withCredentials: true,
    method: 'post',
    url: `http://localhost:8000/api/v1/auth/login/confirm`,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'client-id': 'b980b13c-4db8-4e8a-859c-4544fd70825f',
    },
    data : data
  };
  return axios(config);
}


export const loginUser = async (email, password) => {

  try {
    // Get salt from server
    const salt_response = await getSalt(email);
    const { salt } = salt_response.data;

    // Create SRP Client
    const client = await getSRPClient(email, password, salt);
    const clientPubliKey = client.computeA();

    // Send A to server and receive B
    const login_response = await initiateLogin(email, Buffer.from(clientPubliKey).toString('hex'))
    const {salt_, server_public_key} = login_response.data;
    client.setB(Buffer.from(server_public_key, 'hex'));

    const clientProof = client.computeM1();

    // Share proofs and complete login
    const confirm_login_response = await confirmLogin(
      email,
      Buffer.from(clientProof).toString('hex')
    );
    const { server_proof, key_wrapping_key } = confirm_login_response.data;
    // if (client.checkServerProof(server_proof)){
    if (client.checkM2(Buffer.from(server_proof, "hex"))){
      console.warn("Server verified!");
      return {
        loggedIn: true,
        key_wrapping_key: key_wrapping_key
      };
    }
    else{
      console.error("Server not verified!");
      return {
        loggedIn: false
      };
    }
  }
  catch(error){
    console.error(error);
  }

  return false;
}


export const getLoginStatus = () => {
  var config = {
    withCredentials: true,
    method: 'get',
    url: `http://localhost:8000/api/v1/auth/status`,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  };

  return axios(config);
}


export const logoutUser = () => {
  var config = {
    withCredentials: true,
    method: 'post',
    url: `http://localhost:8000/api/v1/auth/logout`,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  };

  return axios(config);
}