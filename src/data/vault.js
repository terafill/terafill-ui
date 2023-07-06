import axios from 'axios';
import Cookies from 'js-cookie';

const baseUrl = 'http://localhost:8000/api/v1';

export async function getVaults() {
  const requestUrl = `${baseUrl}/users/me/vaults/`;
  var config = {
    withCredentials: true,
    method: 'get',
    url: requestUrl,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'client-id': 'b980b13c-4db8-4e8a-859c-4544fd70825f',
    },
  };

  try {
    let response = await axios(config);
    return response.data;
  } catch (error) {
    console.log(error);
  }

  return null;
}

export async function getVaultItems(vault_id) {
  const requestUrl = `${baseUrl}/users/me/vaults/${vault_id}/items/`;
  var config = {
    withCredentials: true,
    method: 'get',
    url: requestUrl,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'client-id': 'b980b13c-4db8-4e8a-859c-4544fd70825f',
    },
  };

  try {
    let response = await axios(config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getDefaultVaultId() {
  const vaults = await getVaults();
  const default_vault = vaults[0];
  const vault_id = default_vault.id;
  return vault_id;
}

export async function getDefaultVaultItems() {
  const default_vault_id = await getDefaultVaultId();
  const vault_items = await getVaultItems(default_vault_id);
  console.log(default_vault_id, 'vault_items', vault_items);
  return vault_items;
}

export async function updateVault(vault_id, name, description) {
  const requestUrl = `${baseUrl}/users/me/vaults/${vault_id}`;
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
      name: name,
      description: description,
    },
  };

  try {
    let response = await axios(config);
    console.log('Vault updated !');
    return response;
  } catch (error) {
    console.log(error);
  }

  return {};
}

export async function addVault(name, description) {
  const requestUrl = `${baseUrl}/users/me/vaults/`;
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
      name: name,
      description: description,
    },
  };

  try {
    let response = await axios(config);
    console.log('Vault Added!');
    return response;
  } catch (error) {
    console.log(error);
  }

  return {};
}

export async function deleteVault(vault_id) {
  const requestUrl = `${baseUrl}/users/me/vaults/${vault_id}`;
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
    console.log('Vault Deleted!');
    return response;
  } catch (error) {
    console.log(error);
  }

  return {};
}
