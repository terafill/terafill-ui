import axios from 'axios';

import { BASE_URL } from '../config';

export async function getProfile() {
  const requestUrl = `${BASE_URL}/users/me`;
  const config = {
    withCredentials: true,
    method: 'get',
    url: requestUrl,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  try {
    const response = await axios(config);
    return response?.data || {};
  } catch (error) {
    const errorMessage = error?.response?.data?.detail?.info || `Something went wrong: ${error}.`;
    throw Error(errorMessage);
  }
}

export async function getProfileImage() {
  const requestUrl = `${BASE_URL}/users/me/profile-image`;
  const config = {
    withCredentials: true,
    method: 'get',
    url: requestUrl,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };

  try {
    const response = await axios(config);
    return response?.data || {};
  } catch (error) {
    const errorMessage = error?.response?.data?.detail?.info || `Something went wrong: ${error}.`;
    throw Error(errorMessage);
  }
}

interface User {
  firstName?: string;
  lastName?: string;
  phoneNo?: string;
  file: File | null;
}

export async function updateProfile({ firstName, lastName, phoneNo, file }: User) {
  const formData = new FormData();

  // Append fields to formData
  if (firstName) {
    formData.append('first_name', firstName);
  }
  if (lastName) {
    formData.append('last_name', lastName);
  }
  if (phoneNo) {
    formData.append('phone_no', phoneNo);
  }

  if (file) {
    formData.append('file', file);
  }

  const requestUrl = `${BASE_URL}/users/me`;
  const config = {
    withCredentials: true,
    method: 'put',
    url: requestUrl,
    headers: {
      'Content-Type': 'multipart/form-data',
      // 'Content-Type': 'application/json',
      // 'Accept': 'application/json',
    },
    data: formData,
  };

  try {
    const response = await axios(config);
    return response?.data || {};
  } catch (error) {
    const errorMessage = error?.response?.data?.detail?.info || `Something went wrong: ${error}.`;
    throw Error(errorMessage);
  }
}
