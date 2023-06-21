import axios from 'axios';

const baseUrl = "http://localhost:8000/api/v1"


export async function getProfile(){

  const requestUrl =  `${baseUrl}/users/me/`;
  var config = {
    withCredentials: true,
    method: 'get',
    url: requestUrl,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
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


export async function getProfileImage(){

  const requestUrl =  `${baseUrl}/users/me/profile-image/`;
  var config = {
    withCredentials: true,
    method: 'get',
    url: requestUrl,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
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


export async function updateProfile(firstName, lastName, phoneNo, file=null){

  const formData = new FormData();

  // Append fields to formData
  formData.append("first_name", firstName);
  formData.append("last_name", lastName);
  formData.append("phone_no", phoneNo);

  if(file){
    formData.append("file", file);
  }

  const requestUrl =  `${baseUrl}/users/me/`;
  var config = {
    withCredentials: true,
    method: 'put',
    url: requestUrl,
    headers: {
      'Content-Type': 'multipart/form-data',
      // 'Content-Type': 'application/json',
      // 'Accept': 'application/json',
    },
    data: formData
  };

  try {
    let response = await axios(config);
    return response
  } catch (error) {
    console.error(error);
  }

  return null;
}