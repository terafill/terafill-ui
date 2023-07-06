import forge from 'node-forge';
import CryptoJS from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';
import SRP from 'srp-js';
// import jsrp from "jsrp"
import { Buffer } from 'buffer/';
// import crypto from "crypto";

export const getSRPClient = (username, password, salt) => {
  console.log('getSRPClient_.email', username);
  console.log('getSRPClient_.password', password);

  return new Promise((resolve, reject) => {
    const params = SRP.params[1024];

    var identity = Buffer.from(username);
    console.log('getSRPClient.username', username);
    console.log('getSRPClient.password', password);
    var password_ = Buffer.from(password);
    var salt_ = Buffer.from(salt, 'hex');
    // var salt = crypto.randomBytes(32);
    // var salt = Buffer.from(CryptoJS.lib.WordArray.random(32).toString(), 'hex');
    var verifier = SRP.computeVerifier(params, salt_, identity, password_);
    // var secret = crypto.randomBytes(32);
    var secret = Buffer.from(CryptoJS.lib.WordArray.random(32).toString(), 'hex');

    const client = new SRP.Client(params, salt_, identity, password_, secret);
    resolve(client);

    // var client = new jsrp.client();

    // client.init({username: username, password: password, length: 1024}, ()=> {
    //     resolve(client);
    // })
  });
};

export const getAuthClientDetails = (username, password) => {
  return new Promise((resolve, reject) => {
    const params = SRP.params[1024];
    var identity = Buffer.from(username);
    var password_ = Buffer.from(password);
    // var salt = crypto.randomBytes(32);
    var salt = Buffer.from(CryptoJS.lib.WordArray.random(32).toString(), 'hex');
    var verifier = SRP.computeVerifier(params, salt, identity, password_);

    // var client = new jsrp.client();

    // client.init({username: username, password: password, length: 1024}, ()=> {})

    // client.createVerifier((err, result) => {
    //     if(err) {
    //         reject(err);
    //     } else {
    //         console.log("result", result.salt, result.verifier);
    //         resolve([result.salt, result.verifier]);
    //     }
    // });
    resolve([salt, verifier]);
  });
};

export function getHash(passphrase, algorithm, salt = null) {
  if (algorithm === 'SHA-256') {
    const hash = CryptoJS.SHA256(passphrase);
    return hash.toString(CryptoJS.enc.Hex);
  } else if (algorithm === 'PBKDF2') {
    if (salt === null) {
      const salt = CryptoJS.lib.WordArray.random(128 / 8);
    }
    const iterations = 1000;
    const keyLength = 256;
    const key = CryptoJS.PBKDF2(passphrase, salt, {
      keySize: keyLength / 32,
      iterations: iterations,
    });
    return key.toString(CryptoJS.enc.Hex);
  } else {
    throw new Error('Unsupported algorithm');
  }
}

export function encryptData(rawData, key) {
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

export function decryptData(cipherTextWithIv, key) {
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
  return secret_key;
};

export const storeEncryptedData = (key, value, key_hash_salt, value_encryption_key) => {
  localStorage.setItem(
    deriveEncryptionKey(key, 'PBKDF2', key_hash_salt),
    encryptData(value, value_encryption_key),
  );
};

export const fetchDecryptedData = (key, key_hash_salt, value_encryption_key) => {
  const encrypted_data = localStorage.getItem(deriveEncryptionKey(key, 'PBKDF2', key_hash_salt));

  return decryptData(encrypted_data, value_encryption_key);
};

export const getKeyWrappingKeyPair = () => {
  const key_wrapping_key = localStorage.getItem('key_wrapping_key');
  const key_wrapping_key_public = localStorage.getItem('key_wrapping_key_public');
  return {
    public: forge.pki.publicKeyFromPem(key_wrapping_key_public),
    private: forge.pki.privateKeyFromPem(key_wrapping_key),
  };
};

export const storeAuthData = (email, password = null, key_wrapping_key = null) => {
  localStorage.clear();
  localStorage.setItem('email', email);
  if (key_wrapping_key) {
    const hashed_password = getHash(password, 'SHA-256');
    const key_wrapping_key_decypted = forge.pki.decryptRsaPrivateKey(
      key_wrapping_key,
      hashed_password,
    );
    const key_wrapping_key_pem = forge.pki.privateKeyToPem(key_wrapping_key_decypted);
    localStorage.setItem('key_wrapping_key', key_wrapping_key_pem);

    const key_wrapping_key_public = forge.pki.setRsaPublicKey(
      key_wrapping_key_decypted.n,
      key_wrapping_key_decypted.e,
    );
    var key_wrapping_key_public_pem = forge.pki.publicKeyToPem(key_wrapping_key_public);
    localStorage.setItem('key_wrapping_key_public', key_wrapping_key_public_pem);
  }
};

export const getRSAPrivateKey = (password = null, encrypted = false) => {
  const { privateKey } = forge.pki.rsa.generateKeyPair(2048);
  const privateKeyPem = forge.pki.privateKeyToPem(privateKey);

  if (!encrypted) {
    return privateKeyPem;
  }

  const hashed_password = getHash(password, 'SHA-256');
  const encryptedPrivateKeyPem = forge.pki.encryptRsaPrivateKey(privateKey, hashed_password);
  return encryptedPrivateKeyPem;
};
