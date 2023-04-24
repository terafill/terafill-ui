import axios from 'axios';
import Cookies from 'js-cookie';

const baseUrl = "http://localhost:8000/api/v1"

async function getVaults(){

  const requestUrl =  `${baseUrl}/users/me/vaults/`;
  console.log(requestUrl);

  var config = {
    method: 'get',
    url: requestUrl,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${Cookies.get("accessToken")}`
    }
  };

  try {
    let response = await axios(config);
    return response.data
  } catch (error) {
    console.log(error);
  }

  return null;

}

async function getVaultItems(vault_id){
  const requestUrl = `${baseUrl}/users/me/vaults/${vault_id}/items/`;
  console.log(requestUrl);

  var config = {
    method: 'get',
    url: requestUrl,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${Cookies.get("accessToken")}`
    }
  };

  try {
    let response = await axios(config);
    return response.data
  } catch (error) {
    console.log(error);
  }
}

export async function getDefaultVaultId(){
  const vaults = await getVaults();
  const default_vault = vaults[0];
  const vault_id = default_vault.id;
  return vault_id;
}

export async function getDefaultVaultItems(){

  const default_vault_id = await getDefaultVaultId();
  const vault_items = await getVaultItems(default_vault_id);
  console.log(default_vault_id, "vault_items", vault_items);
  return vault_items;
}


export async function updateVaultItem(id, title, website, password, username){
  const vault_id = await getDefaultVaultId();
  const requestUrl = `${baseUrl}/users/me/vaults/${vault_id}/items/${id}`;
  console.log(requestUrl);

  var config = {
    method: 'put',
    url: requestUrl,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${Cookies.get("accessToken")}`
    },
    data: {
      title: title,
      website: website,
      password: password,
      username: username
    }
  };

  try {
    let response = await axios(config);
    console.log("Item updated !")
    return response.data
  } catch (error) {
    console.log(error);
  }
}