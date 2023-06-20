import axios from 'axios';
import Cookies from 'js-cookie';
import { getVDEK, encryptData } from './auth';

const baseUrl = "http://localhost:8000/api/v1"


export async function updateVaultItem(vault_id, id, title, website, password, username){
  const requestUrl = `${baseUrl}/users/me/vaults/${vault_id}/items/${id}`;
  const vdek = getVDEK();

  var config = {
    withCredentials: true,
    method: 'put',
    url: requestUrl,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${Cookies.get("accessToken")}`
    },
    data: {
      title: encryptData(title, vdek),
      website: encryptData(website, vdek),
      password: encryptData(password, vdek),
      username: encryptData(username, vdek),
    }
  };

  try {
    let response = await axios(config);
    console.log("Item updated !")
    return response
  } catch (error) {
    console.log(error);
  }

  return {}
}

export async function createVaultItem(vault_id, title, website, password, username){
  const requestUrl = `${baseUrl}/users/me/vaults/${vault_id}/items/`;
  const vdek = getVDEK();

  var config = {
    withCredentials: true,
    method: 'post',
    url: requestUrl,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${Cookies.get("accessToken")}`
    },
    data: {
      title: encryptData(title, vdek),
      website: encryptData(website, vdek),
      password: encryptData(password, vdek),
      username: encryptData(username, vdek),
      type: "PASSWORD"
    }
  };

  try {
    let response = await axios(config);
    console.log("Item created successfully !")
    return response
  } catch (error) {
    console.log(error);
  }

  return {}
}

export async function deleteVaultItem(vault_id, id){
  const requestUrl = `${baseUrl}/users/me/vaults/${vault_id}/items/${id}`;
  console.log(requestUrl);

  var config = {
    withCredentials: true,
    method: 'delete',
    url: requestUrl,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${Cookies.get("accessToken")}`
    },
  };

  try {
    let response = await axios(config);
    console.log("Item deleted successfully !")
    return response
  } catch (error) {
    console.log(error);
  }

  return {}
}

