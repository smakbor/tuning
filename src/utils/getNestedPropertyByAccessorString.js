/**
 * @param {object} obj - object to get nested property from
 * @param {string} accessor - accessor string to get nested property
 * @returns {any} - nested property value
 * @example
 * const obj = { a: { b: { c: 1 } } };
 * getNestedPropertyByAccessorString(obj, 'a.b.c'); // 1
 * **/
export const getNestedPropertyByAccessorString = (obj, accessor) => {
  // REGEX TO SPLIT ACCESSOR INTO PARTS, HANDLING BOTH DOT AND BRACKET NOTATION
  const parts = accessor.match(/([^[\].]+|\[\d+\])/g);

  return parts.reduce((acc, part) => {
    // REMOVE SQUARE BRACKETS FROM ARRAY INDICES
    part = part.replace(/[[\]']+/g, '');
    return acc && acc[part];
  }, obj);
};
