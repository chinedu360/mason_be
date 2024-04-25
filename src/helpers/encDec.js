const express = require("express");
const CryptoJS = require("crypto-js");

const encryptionKey =
  "4f16d432927a3095addddde7da0b86cdd73659c8f3e630064f839c4ca41b67d4";

function encryptData(data) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), encryptionKey).toString();
}

function decryptData(encryptedData) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
}

module.exports = { encryptData, decryptData };
