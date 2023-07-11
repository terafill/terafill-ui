import axios from 'axios';

import { getKeyWrappingKeyPair, encryptData } from '../utils/security';

const baseUrl = 'http://localhost:8000/api/v1';
const clientId = 'b980b13c-4db8-4e8a-859c-4544fd70825f';

export async function updateVaultItem(vault_id, id, title, website, password, username, iek) {
  const requestUrl = `${baseUrl}/users/me/vaults/${vault_id}/items/${id}`;

  var config = {
    withCredentials: true,
    method: 'put',
    url: requestUrl,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'client-id': clientId,
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
    return { response: response?.data || {} };
  } catch (error) {
    const error_msg = error?.response?.data?.detail?.info || `Something went wrong: ${error}.`;
    return { error: error_msg };
  }
}

export async function createVaultItem(vault_id, title, website, password, username, iek) {
  const requestUrl = `${baseUrl}/users/me/vaults/${vault_id}/items/`;
  const key_wrapping_key_pair = getKeyWrappingKeyPair();
  const iek_enc = key_wrapping_key_pair.public.encrypt(iek);

  var config = {
    withCredentials: true,
    method: 'post',
    url: requestUrl,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'client-id': clientId,
    },
    data: {
      title: encryptData(title, iek),
      website: encryptData(website, iek),
      password: encryptData(password, iek),
      username: encryptData(username, iek),
      encrypted_encryption_key: iek_enc,
      type: 'PASSWORD',
    },
  };

  try {
    let response = await axios(config);
    return { response: response?.data || {} };
  } catch (error) {
    const error_msg = error?.response?.data?.detail?.info || `Something went wrong: ${error}.`;
    return { error: error_msg };
  }
}

export async function deleteVaultItem(vault_id, id) {
  const requestUrl = `${baseUrl}/users/me/vaults/${vault_id}/items/${id}`;
  console.log(requestUrl);

  var config = {
    withCredentials: true,
    method: 'delete',
    url: requestUrl,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'client-id': clientId,
    },
  };

  try {
    let response = await axios(config);
    return { response: response?.data || {} };
  } catch (error) {
    const error_msg = error?.response?.data?.detail?.info || `Something went wrong: ${error}.`;
    return { error: error_msg };
  }
}
