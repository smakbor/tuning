const removeEmptyObjects = (obj) => {
  var propNames = Object.getOwnPropertyNames(obj);
  for (var i = 0; i < propNames.length; i++) {
    var propName = propNames[i];
    if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
      delete obj[propName];
    }
  }

  return obj;
};
const removeEmptyElements = (obj) => {
  if (Array.isArray(obj)) {
    obj.forEach((element, index) => obj.splice(index, 1, removeEmptyElements(element)));
    return obj;
  }
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([, v]) => (Array.isArray(v) ? v.length !== 0 : v !== null && v !== '' && v !== undefined))
      .map(([k, v]) => [k, v === Object(v) ? removeEmptyElements(v) : v])
  );
};
export { removeEmptyObjects };
export default removeEmptyElements;
