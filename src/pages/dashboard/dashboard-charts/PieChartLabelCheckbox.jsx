import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import PropTypes from 'prop-types';
import { useState } from 'react';

const PieChartLabelCheckbox = ({ defaultChecked, value, onChange }) => {
  const [labelCheckbox, setLabelCheckbox] = useState(defaultChecked);

  return (
    <FormControlLabel
      control={
        <Checkbox
          value={value}
          checked={labelCheckbox}
          onChange={({ target }) => {
            onChange();
            setLabelCheckbox(target.checked);
          }}
        />
      }
      label={value}
    />
  );
};

PieChartLabelCheckbox.propTypes = {
  defaultChecked: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
export default PieChartLabelCheckbox;
