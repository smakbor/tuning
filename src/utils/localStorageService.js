const getItem = (key) => {
  const data = localStorage.getItem(key);
  if (data) {
    const isParsable = isStringParsableToObject(data);
    if (isParsable) {
      return JSON.parse(data);
    }
    return data;
  }
  return null;
};

const setItem = (key, value) => {
  if (typeof value === 'object') {
    const stringify = JSON.stringify(value);
    localStorage.setItem(key, stringify);
  }
  localStorage.setItem(key, value);
};

function isStringParsableToObject(str) {
  try {
    const obj = JSON.parse(str);
    return typeof obj === 'object' && obj !== null;
  } catch (error) {
    return false;
  }
}

const localStorageService = {
  getItem,
  setItem
};
export default localStorageService;
