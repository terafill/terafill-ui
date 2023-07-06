import axios from 'axios';
import forge from 'node-forge';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';
import { getKeyWrappingKeyPair, encryptData } from '../utils/security';

const baseUrl = 'http://localhost:8000/api/v1';

export async function updateVaultItem(vault_id, id, title, website, password, username, iek) {
  const requestUrl = `${baseUrl}/users/me/vaults/${vault_id}/items/${id}`;

  var config = {
    withCredentials: true,
    method: 'put',
    url: requestUrl,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'client-id': 'b980b13c-4db8-4e8a-859c-4544fd70825f',
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
    console.log('Item updated !');
    return response;
  } catch (error) {
    console.log(error);
  }

  return {};
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
      'client-id': 'b980b13c-4db8-4e8a-859c-4544fd70825f',
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
    console.log('Item created successfully !');
    return response;
  } catch (error) {
    console.log(error);
  }

  return {};
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
      'client-id': 'b980b13c-4db8-4e8a-859c-4544fd70825f',
    },
  };

  try {
    let response = await axios(config);
    console.log('Item deleted successfully !');
    return response;
  } catch (error) {
    console.log(error);
  }

  return {};
}
