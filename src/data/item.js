import axios from 'axios';

import { BASE_URL, CLIENT_ID } from '../config.js';
import { getKeyWrappingKeyPair, encryptData } from '../utils/security';

export async function getVaultItem({ vaultId, id }) {
  const requestUrl = `${BASE_URL}/users/me/vaults/${vaultId}/items/${id}`;

  var config = {
    withCredentials: true,
    method: 'get',
    url: requestUrl,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'client-id': CLIENT_ID,
    },
  };

  try {
    let response = await axios(config);
    return response?.data || {};
  } catch (error) {
    const errorMessage = error?.response?.data?.detail?.info || `Something went wrong: ${error}.`;
    throw Error(errorMessage);
  }
}

export async function updateVaultItem({ vaultId, id, title, website, password, username, iek }) {
  const requestUrl = `${BASE_URL}/users/me/vaults/${vaultId}/items/${id}`;

  var config = {
    withCredentials: true,
    method: 'put',
    url: requestUrl,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'client-id': CLIENT_ID,
    },
    data: {
      title: encryptData(title, iek),
      website: encryptData(website, iek),
      password: encryptData(password, iek),
      username: encryptData(username, iek),
    },
  };

  try {
    let response = await axios(config);
    return response?.data || {};
  } catch (error) {
    const errorMessage = error?.response?.data?.detail?.info || `Something went wrong: ${error}.`;
    throw Error(errorMessage);
  }
}

export async function createVaultItem({ vaultId, title, website, password, username, iek }) {
  const requestUrl = `${BASE_URL}/users/me/vaults/${vaultId}/items`;
  const keyWrappingKeyPair = getKeyWrappingKeyPair();
  const iekEnc = keyWrappingKeyPair.public.encrypt(iek);

  var config = {
    withCredentials: true,
    method: 'post',
    url: requestUrl,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'client-id': CLIENT_ID,
    },
    data: {
      title: encryptData(title, iek),
      website: encryptData(website, iek),
      password: encryptData(password, iek),
      username: encryptData(username, iek),
      encryptedEncryptionKey: iekEnc,
      type: 'PASSWORD',
    },
  };

  try {
    let response = await axios(config);
    return response?.data || {};
  } catch (error) {
    const errorMessage = error?.response?.data?.detail?.info || `Something went wrong: ${error}.`;
    throw Error(errorMessage);
  }
}

export async function deleteVaultItem({ vaultId, id }) {
  const requestUrl = `${BASE_URL}/users/me/vaults/${vaultId}/items/${id}`;
  console.log(requestUrl);

  var config = {
    withCredentials: true,
    method: 'delete',
    url: requestUrl,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'client-id': CLIENT_ID,
    },
  };

  try {
    let response = await axios(config);
    return response?.data || {};
  } catch (error) {
    const errorMessage = error?.response?.data?.detail?.info || `Something went wrong: ${error}.`;
    throw Error(errorMessage);
  }
}
