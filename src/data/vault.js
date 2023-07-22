import axios from 'axios';

// const baseUrl = 'http://localhost:8000/api/v1';
const baseUrl = 'https://keylance-backend-svc-dev.up.railway.app/api/v1'
const clientId = 'b980b13c-4db8-4e8a-859c-4544fd70825f';

export async function getVaults() {
  const requestUrl = `${baseUrl}/users/me/vaults`;
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
    return response?.data || {};
  } catch (error) {
    const errorMessage = error?.response?.data?.detail?.info || `Something went wrong: ${error}.`;
    throw Error(errorMessage);
  }
}

export async function getVaultItems(vaultId) {
  const requestUrl = `${baseUrl}/users/me/vaults/${vaultId}/items`;
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
    return response?.data || {};
  } catch (error) {
    const errorMessage = error?.response?.data?.detail?.info || `Something went wrong: ${error}.`;
    throw Error(errorMessage);
  }
}

export async function getDefaultVaultId() {
  const { response } = await getVaults();
  const defaultVault = response[0];
  const vaultId = defaultVault.id;
  return vaultId;
}

export async function getDefaultVaultItems() {
  const defaultVaultId = await getDefaultVaultId();
  const { response } = await getVaultItems(defaultVaultId);
  return response;
}

export async function updateVault({ vaultId, name, description }) {
  const requestUrl = `${baseUrl}/users/me/vaults/${vaultId}`;
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
    return response?.data || {};
  } catch (error) {
    const errorMessage = error?.response?.data?.detail?.info || `Something went wrong: ${error}.`;
    throw Error(errorMessage);
  }
}

export async function addVault({ name, description }) {
  const requestUrl = `${baseUrl}/users/me/vaults`;
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
    return response?.data || {};
  } catch (error) {
    const errorMessage = error?.response?.data?.detail?.info || `Something went wrong: ${error}.`;
    throw Error(errorMessage);
  }
}

export async function deleteVault({ vaultId }) {
  const requestUrl = `${baseUrl}/users/me/vaults/${vaultId}`;
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
    return response?.data || {};
  } catch (error) {
    const errorMessage = error?.response?.data?.detail?.info || `Something went wrong: ${error}.`;
    throw Error(errorMessage);
  }
}
