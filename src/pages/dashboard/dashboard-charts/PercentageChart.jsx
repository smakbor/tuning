import * as React from 'react';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import PropTypes from 'prop-types';

const PercentageChart = ({ value = 0 }) => {
  const settings = {
    height: 200,
    value: value,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  };

  return (
    <Gauge
      {...settings}
      text={`${settings.value}%`}
      cornerRadius="50%"
      sx={(theme) => ({
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: 40
        },
        [`& .${gaugeClasses.valueArc}`]: {
          fill: value >= 100 ? theme.palette.success.main : value > 50 ? theme.palette.warning.main : theme.palette.error.main
        },
        [`& .${gaugeClasses.referenceArc}`]: {
          fill: theme.palette.text.disabled
        }
      })}
    />
  );
};

PercentageChart.propTypes = {
  value: PropTypes.number.isRequired
};

export default PercentageChart;
