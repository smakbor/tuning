import divisions from '../../src/utils/Address-json/divisions.json';
import districts from '../../src/utils/Address-json/districts.json';
import thanas from '../../src/utils/Address-json/thana.json';

// -> GET DATA FROM JSON FILE
const division = divisions.divisions;
const district = districts.districts;
const { thana } = thanas;

/**
 * @returns {Array} options
 */
export const convertDivisionOptions = () => {
  let options = [];
  division.map((item) => {
    options.push({ value: item.id, label: item.name });
  });
  return options;
};

/**
 * @param {number} watchdivision
 * @returns {Array} options
 **/
export const convertDistrictOptions = (watchdivision) => {
  const options = district.reduce((arr, item) => {
    if (item.division_id == watchdivision) {
      arr.push({ label: item.name, value: item.id });
    }
    return arr;
  }, []);
  return options;
};

/**
 * @param {number} watchdistrict
 * @returns {Array} options
 * */
export const convertThanaOptions = (watchdistrict) => {
  const options = thana.reduce((arr, item) => {
    if (item.district_id == watchdistrict) {
      arr.push({ label: item.name, value: item.id });
    }
    return arr;
  }, []);
  return options;
};

/**
 * @info Assuming division, district, and thana
 * @param {number} divisionId - division id
 * @returns {string} - division name
 */
export function getDivision(divisionId) {
  const divisionData = division.find((item) => item.id == divisionId);
  return divisionData?.name;
}
/**
 *
 * @param {districtId} districtId - district id
 * @returns {string} - district name
 */
export function getDistrict(districtId) {
  const districtData = district.find((item) => item.id == districtId);
  return districtData?.name;
}

/**
 * @param {thanaId} thanaId - thana id
 * @returns {string} - thana name
 */
export function getThana(thanaId) {
  const thanaData = thana.find((item) => item.id == thanaId);
  return thanaData?.name;
}
