import axios from 'axios';

const baseUrl = 'http://localhost:8000/api/v1';
const clientId = "b980b13c-4db8-4e8a-859c-4544fd70825f"

export async function getVaults() {
  const requestUrl = `${baseUrl}/users/me/vaults/`;
  var config = {
    withCredentials: true,
    method: 'get',
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

export async function getVaultItems(vault_id) {
  const requestUrl = `${baseUrl}/users/me/vaults/${vault_id}/items/`;
  var config = {
    withCredentials: true,
    method: 'get',
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

export async function getDefaultVaultId() {
  const { response } = await getVaults();
  const default_vault = response[0];
  const vault_id = default_vault.id;
  return vault_id;
}

export async function getDefaultVaultItems() {
  const default_vault_id = await getDefaultVaultId();
  const { response } = await getVaultItems(default_vault_id);
  return response;
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
      'client-id': clientId,
    },
    data: {
      name: name,
      description: description,
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

export async function addVault(name, description) {
  const requestUrl = `${baseUrl}/users/me/vaults/`;
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
      name: name,
      description: description,
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

export async function deleteVault(vault_id) {
  const requestUrl = `${baseUrl}/users/me/vaults/${vault_id}`;
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
