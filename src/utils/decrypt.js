function decrypt(encryptedIP) {
  encryptedIP = encryptedIP.replace(/-/g, "+").replace(/_/g, "/");
  while (encryptedIP.length % 4) {
    encryptedIP += "=";
  }
  const combined = atob(encryptedIP);
  return combined.split("-")[1];
}

export default decrypt;
