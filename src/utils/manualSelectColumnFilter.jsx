/* eslint-disable react-hooks/rules-of-hooks */

import { MenuItem, Select } from '@mui/material';
import PropTypes from 'prop-types';
import { useMemo } from 'react';

/***
 * @manualSelectColumnFilter
 * @param {object} column - column object come from Filter call back function. just destructure from callback parameter and pass it like this ...column
 * @param {array} manualOptions - manual options of menu. options array of  objects should content {label: "label Name", Value: "menu _id"}
 * */

const manualSelectColumnFilter = ({ filterValue, setFilter, manualOptions }) => {
  const options = useMemo(() => manualOptions, [manualOptions]);

  return (
    <Select
      value={filterValue}
      id="select-filter"
      defaultValue="All"
      onChange={(e) => {
        setFilter((e.target.value === 'All' ? '' : e.target.value) || undefined);
      }}
      displayEmpty
      size="small"
    >
      <MenuItem value="All">All</MenuItem>
      {options?.map((option, i) => (
        <MenuItem key={i} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};

manualSelectColumnFilter.propTypes = {
  filterValue: PropTypes.string,
  setFilter: PropTypes.func,
  manualOptions: PropTypes.array
};

export default manualSelectColumnFilter;
