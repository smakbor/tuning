/**
 * @constructor
 * @param {array} array - array of objects of main data
 * @param {string} label - label name of the object
 * @param {string} value - value of the object approximately id
 * @param {string} dependedId - optional. if the module is depended on another module
 * @returns {array} - array of objects
 * **/

export const convertToLabel = (array, label, value, dependedId) => {
  return array?.map((item) => {
    return {
      label: item[label],
      value: item[value],
      ...(dependedId && { [dependedId]: item[dependedId] })
    };
  });
};
