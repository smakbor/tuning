import * as React from 'react';
import Box from '@mui/material/Box';

import { Grid, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';
import { PieChart } from '@mui/x-charts';
import { useState } from 'react';
import PieChartLabelCheckbox from './PieChartLabelCheckbox';

const DualPieChart = ({ placement = 'left', data = [] }) => {
  const [labelCheckBoxes, setLabelCheckBoxes] = useState(data.map((item) => item.shortForm) || []);
  const [pieChartData, setPieChartData] = useState(data || []);

  return (
    <Grid container alignItems="center" justifyContent="end">
      {placement === 'left' && (
        <Grid item xs={12} md={2}>
          {data.map((item, index) => {
            return (
              <Tooltip key={index} arrow title={item.label} placement="right">
                <Box>
                  <PieChartLabelCheckbox
                    defaultChecked={labelCheckBoxes.includes(item.shortForm)}
                    value={item.shortForm}
                    onChange={() => {
                      if (labelCheckBoxes.includes(item.shortForm)) {
                        // -> REMOVE THE ITEM FROM THE LABEL CHECKBOXES
                        setLabelCheckBoxes(labelCheckBoxes.filter((label) => label !== item.shortForm));

                        // -> REMOVE THE ITEM FROM THE PIE CHART DATA
                        setPieChartData(pieChartData.filter((pie) => pie.shortForm !== item.shortForm));
                      } else {
                        // -> FIND THE INDEX OF THE ITEM
                        const index = data.findIndex((dataItem) => dataItem.shortForm === item.shortForm);

                        // -> CLONE THE DATA
                        const cloneData = [...pieChartData];
                        // -> INSERT THE NEW DATA AT THE INDEX
                        cloneData.splice(index, 0, data[index]);

                        // -> SET THE NEW DATA
                        setPieChartData(cloneData);
                        setLabelCheckBoxes([...labelCheckBoxes, item.shortForm]);
                      }
                    }}
                  />
                </Box>
              </Tooltip>
            );
          })}
        </Grid>
      )}

      <Grid item xs={12} md={10}>
        <Box>
          <PieChart
            {...{ height: 200, margin: { right: 5 } }}
            series={[
              {
                data: pieChartData,
                outerRadius: 100,
                arcLabel: (item) => item.value,
                innerRadius: 3
              }
            ]}
            slotProps={{
              legend: { hidden: true }
            }}
          />
        </Box>
      </Grid>

      {placement === 'right' && (
        <Grid item xs={12} md={2} paddingRight={2}>
          {data.map((item, index) => (
            <Tooltip key={index} arrow title={item.label} placement="right">
              <Box>
                <PieChartLabelCheckbox
                  defaultChecked={labelCheckBoxes.includes(item.shortForm)}
                  value={item.shortForm}
                  onChange={() => {
                    if (labelCheckBoxes.includes(item.shortForm)) {
                      // -> REMOVE THE ITEM FROM THE LABEL CHECKBOXES
                      setLabelCheckBoxes(labelCheckBoxes.filter((label) => label !== item.shortForm));

                      // -> REMOVE THE ITEM FROM THE PIE CHART DATA
                      setPieChartData(pieChartData.filter((pie) => pie.shortForm !== item.shortForm));
                    } else {
                      // -> FIND THE INDEX OF THE ITEM
                      const index = data.findIndex((dataItem) => dataItem.shortForm === item.shortForm);

                      // -> CLONE THE DATA
                      const cloneData = [...pieChartData];
                      // -> INSERT THE NEW DATA AT THE INDEX
                      cloneData.splice(index, 0, data[index]);

                      // -> SET THE NEW DATA
                      setPieChartData(cloneData);
                      setLabelCheckBoxes([...labelCheckBoxes, item.shortForm]);
                    }
                  }}
                />
              </Box>
            </Tooltip>
          ))}
        </Grid>
      )}
    </Grid>
  );
};

DualPieChart.propTypes = {
  placement: PropTypes.oneOf(['left', 'right']),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      shortForm: PropTypes.string
    })
  ).isRequired
};

export default DualPieChart;
