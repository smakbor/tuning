import axios from "axios";

const getIP = async () => {
  const { data } = await axios("https://api.ipify.org?format=json");
  return data;
};

export default getIP;
