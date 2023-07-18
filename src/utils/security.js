import { Buffer } from 'buffer/';
import CryptoJS from 'crypto-js';
import forge from 'node-forge';
import SRP from 'srp-js';
import { v4 as uuidv4 } from 'uuid';

export const getSRPClient = (username, password, salt) => {
  return new Promise((resolve, reject) => {
    try {
      const params = SRP.params[1024];

      var identity = Buffer.from(username);
      var password_ = Buffer.from(password);
      var salt_ = Buffer.from(salt, 'hex');
      // var verifier = SRP.computeVerifier(params, salt_, identity, password_);
      var secret = Buffer.from(CryptoJS.lib.WordArray.random(32).toString(), 'hex');
      const client = new SRP.Client(params, salt_, identity, password_, secret);
      resolve(client);
    } catch (error) {
      reject(error);
    }
  });
};

export const getAuthClientDetails = (username, password) => {
  return new Promise((resolve, reject) => {
    try {
      const params = SRP.params[1024];
      var identity = Buffer.from(username);
      var password_ = Buffer.from(password);
      var salt = Buffer.from(CryptoJS.lib.WordArray.random(32).toString(), 'hex');
      var verifier = SRP.computeVerifier(params, salt, identity, password_);
      resolve([salt, verifier]);
    } catch (error) {
      reject(error);
    }
  });
};

export function getHash(passphrase, algorithm, salt = null) {
  if (algorithm === 'SHA-256') {
    const hash = CryptoJS.SHA256(passphrase);
    return hash.toString(CryptoJS.enc.Hex);
  } else if (algorithm === 'PBKDF2') {
    if (salt === null) {
      salt = CryptoJS.lib.WordArray.random(128 / 8);
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

// export const storeEncryptedData = (key, value, key_hash_salt, value_encryption_key) => {
//   localStorage.setItem(
//     deriveEncryptionKey(key, 'PBKDF2', key_hash_salt),
//     encryptData(value, value_encryption_key),
//   );
// };

// export const fetchDecryptedData = (key, key_hash_salt, value_encryption_key) => {
//   const encrypted_data = localStorage.getItem(deriveEncryptionKey(key, 'PBKDF2', key_hash_salt));

//   return decryptData(encrypted_data, value_encryption_key);
// };

export const getKeyWrappingKeyPair = () => {
  const keyWrappingKey = localStorage.getItem('keyWrappingKey');
  const keyWrappingKeyPublic = localStorage.getItem('keyWrappingKeyPublic');
  return {
    public: forge.pki.publicKeyFromPem(keyWrappingKeyPublic),
    private: forge.pki.privateKeyFromPem(keyWrappingKey),
  };
};

export const storeAuthData = (email, password = null, keyWrappingKey = null) => {
  localStorage.clear();
  localStorage.setItem('email', email);
  if (keyWrappingKey) {
    const hashedPassword = getHash(password, 'SHA-256');
    const keyWrappingKeyDecypted = forge.pki.decryptRsaPrivateKey(keyWrappingKey, hashedPassword);
    const keyWrappingKey_pem = forge.pki.privateKeyToPem(keyWrappingKeyDecypted);
    localStorage.setItem('keyWrappingKey', keyWrappingKey_pem);

    const keyWrappingKeyPublic = forge.pki.setRsaPublicKey(
      keyWrappingKeyDecypted.n,
      keyWrappingKeyDecypted.e,
    );
    var keyWrappingKeyPublicPem = forge.pki.publicKeyToPem(keyWrappingKeyPublic);
    localStorage.setItem('keyWrappingKeyPublic', keyWrappingKeyPublicPem);
  }
};

export const getRSAPrivateKey = (password = null, encrypted = false) => {
  const { privateKey } = forge.pki.rsa.generateKeyPair(2048);
  const privateKeyPem = forge.pki.privateKeyToPem(privateKey);

  if (!encrypted) {
    return privateKeyPem;
  }

  const hashedPassword = getHash(password, 'SHA-256');
  const encryptedPrivateKeyPem = forge.pki.encryptRsaPrivateKey(privateKey, hashedPassword);
  return encryptedPrivateKeyPem;
};
