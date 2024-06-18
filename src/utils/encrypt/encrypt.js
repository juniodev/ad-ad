import CryptoJS from 'crypto-js';

const secretKey = 'pl-67swr__ty8jp8_32klped2-_up0ok';

class CryptoBrowser {
  
  constructor() {
    
  }

  encrypt(text) {
    const iv = CryptoJS.lib.WordArray.random(16);
    const key = CryptoJS.enc.Utf8.parse(secretKey);

    const encrypted = CryptoJS.AES.encrypt(text, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    const ciphertext = iv.concat(encrypted.ciphertext);
    return ciphertext.toString(CryptoJS.enc.Base64)
  }

  decrypt(ciphertext) {
    const key = CryptoJS.enc.Utf8.parse(secretKey);
    const ciphertextBytes = CryptoJS.enc.Base64.parse(ciphertext);

    const iv = ciphertextBytes.clone();
    iv.sigBytes = 16;
    iv.clamp();

    const encryptedText = CryptoJS.lib.WordArray.create(
      ciphertextBytes.words.slice(4),
      ciphertextBytes.sigBytes - 16
    );

    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: encryptedText },
      key,
      { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
    );

    return decrypted.toString(CryptoJS.enc.Utf8);
  }
  
}

export default CryptoBrowser;
