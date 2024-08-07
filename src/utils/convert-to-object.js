/**
 * @info Convert an array of objects to an object of objects.
 * @constructor
 * @param {array} array - array of objects
 * @param {string} key - key of the object
 * @param {array} properties - array of properties of the object
 * @returns {object} - object of objects
 */
export const convertToObject = (array, key, properties) => {
  return array?.reduce((obj, item) => {
    obj[item[key]] = properties.reduce((obj, property) => {
      obj[property] = item[property];
      return obj;
    }, {});
    return obj;
  }, {});
};
