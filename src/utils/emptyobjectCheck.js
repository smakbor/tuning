export const emptyObjectCheck = (data) => {
  let deviceInfo = {};

  for (var key in data) {
    // Initialize deviceInfo[key] as an empty array

    if (Array.isArray(data)) {
      deviceInfo[key] =
        data[key]?.reduce((acc, curr) => {
          if (curr && typeof curr === 'object') {
            let validChildren = {};

            // Check each key in the current object
            for (var childrenKey in curr) {
              if (curr[childrenKey]) {
                validChildren[childrenKey] = curr[childrenKey];
              }
            }

            // If validChildren has keys, add it to the accumulator
            if (Object.keys(validChildren).length > 0) {
              acc.push(validChildren);
            }
          }
          return acc;
        }, []) || [];
    } else {
      if (data[key]) {
        deviceInfo[key] = data[key];
      }
    }
  }

  return deviceInfo;
};
