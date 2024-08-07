/**
 * @description - Function to get all query params from the URL
 * @param {Object} params - Object containing query params from the URL or useSearchParams hook returned array of first element
 * @returns {Object} - Object containing all query params
 **/
export const getAllQueryParams = (params) => {
  const queryParams = {};
  for (const [key, value] of params) {
    queryParams[key] = value;
  }
  return queryParams;
};
