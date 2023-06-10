import axios from 'axios';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';

export const initateSignupProcess = (email) => {
  var data = JSON.stringify({
    email: email,
  });
  var config = {
    method: 'post',
    url: `http://localhost:8000/api/v1/auth/signup`,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    data: data
  }
  return axios(config);
}


export function deriveEncryptionKey(passphrase, algorithm, salt=null) {
    if (algorithm === 'SHA-256') {
        const hash = CryptoJS.SHA256(passphrase);
        return hash.toString(CryptoJS.enc.Hex);
    } else if (algorithm === 'PBKDF2') {
        if (salt === null){
          const salt = CryptoJS.lib.WordArray.random(128/8);
        }
        const iterations = 1000;
        const keyLength = 256;
        const key = CryptoJS.PBKDF2(passphrase, salt, {
            keySize: keyLength / 32,
            iterations: iterations
        });
        return key.toString(CryptoJS.enc.Hex);
    } else {
        throw new Error('Unsupported algorithm');
    }
}


function encryptData(rawData, key) {
    // Generate a random IV
    const iv = CryptoJS.lib.WordArray.random(128 / 8);

    // Encrypt the data
    const encrypted = CryptoJS.AES.encrypt(rawData, CryptoJS.enc.Utf8.parse(key), {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
        iv: iv,
    });

    // Concatenate the IV and the ciphertext
    const cipherTextWithIv = iv.concat(encrypted.ciphertext).toString(CryptoJS.enc.Base64);

    return cipherTextWithIv;
}


function decryptData(cipherTextWithIv, key) {
    // Convert the base64 string back to a WordArray
    const concatenated = CryptoJS.enc.Base64.parse(cipherTextWithIv);

    // Split the IV and ciphertext parts
    const iv = CryptoJS.lib.WordArray.create(concatenated.words.slice(0, 4));
    const ciphertext = CryptoJS.lib.WordArray.create(concatenated.words.slice(4));

    // Decrypt the data
    const decrypted = CryptoJS.AES.decrypt({ ciphertext: ciphertext }, CryptoJS.enc.Utf8.parse(key), {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
        iv: iv,
    });

    return decrypted.toString(CryptoJS.enc.Utf8);

}

export const generateSecretKey = () => {
  const secret_key = uuidv4();
  return secret_key
};


const storeEncryptedData = (key, value, key_hash_salt, value_encryption_key) => {
  localStorage.setItem(
    deriveEncryptionKey(key, "PBKDF2", key_hash_salt),
    encryptData(value, value_encryption_key)
  );
}

export const fetchDecryptedData = (key, key_hash_salt, value_encryption_key) => {
  const encrypted_data = localStorage.getItem(
    deriveEncryptionKey(key, "PBKDF2", key_hash_salt)
  );

  return decryptData(encrypted_data, value_encryption_key);
}


export const storeAuthData = (
  email,
  password,
  secret_key,
  csdek,
) => {
  const csdek_derived = deriveEncryptionKey(csdek, "SHA-256");
  const vdek = deriveEncryptionKey(secret_key, "PBKDF2", password);

  localStorage.clear()

  localStorage.setItem("csdek", csdek);
  storeEncryptedData('secretKey', secret_key, csdek, csdek_derived);
  storeEncryptedData('vdek', vdek, csdek, csdek_derived);
  storeEncryptedData('email', email, csdek, csdek_derived);
}


export const completeSignupProcess = (
  email,
  password,
  secret_key,
  verification_code,
  first_name,
  last_name
  ) => {
  const mpesk = deriveEncryptionKey(secret_key, "PBKDF2", password);
  var data = JSON.stringify({
    email: email,
    mpesk: mpesk,
    verification_code: verification_code,
    first_name: first_name,
    last_name: last_name,
  });

  var config = {
    withCredentials: true,
    method: 'post',
    url: `http://localhost:8000/api/v1/auth/signup/confirm`,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'client-id': 'b980b13c-4db8-4e8a-859c-4544fd70825f',
    },
    data : data
  };

  return axios(config);
}


export const loginUser = (email, password, secret_key) => {

  // const csdek = localStorage.getItem("csdek")
  // const csdek_derived = deriveEncryptionKey(csdek, "SHA-256");
  // storeEncryptedData('secretKey', secret_key, csdek, csdek_derived);

  const mpesk = deriveEncryptionKey(secret_key, "PBKDF2", password);

  var data = JSON.stringify({
    email: email,
    mpesk: mpesk
  });

  var config = {
    withCredentials: true,
    method: 'post',
    url: `http://localhost:8000/api/v1/auth/login`,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'client-id': 'b980b13c-4db8-4e8a-859c-4544fd70825f',
    },
    data : data
  };

  return axios(config);
}


export const getLoginStatus = () => {
  var config = {
    withCredentials: true,
    method: 'get',
    url: `http://localhost:8000/api/v1/auth/status`,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  };

  return axios(config);
}


export const logoutUser = () => {
  var config = {
    withCredentials: true,
    method: 'post',
    url: `http://localhost:8000/api/v1/auth/logout`,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  };

  return axios(config);
}