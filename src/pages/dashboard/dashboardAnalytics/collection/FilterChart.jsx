import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import { useState } from 'react';
import WeeklyBarChart from './WeeklyBarChart';
import PropTypes from 'prop-types';
import MonthlyBarChart from './MonthlyBarChart';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const FilterChart = ({
  monthlyBillData,
  weeklyBillData,
  yearlyBillData,
  filterByMonthAndYearState,
  setFilterByMonthAndYearState,
  setOnDateFieldClose
}) => {
  const [slot, setSlot] = useState('month');

  return (
    <Grid sx={{ m: 1 }} container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Collection Overview</Typography>
          </Grid>

          <Grid item xs={12} lg={4}>
            {/* FILTERED SPECIFIC BY MONTH AND YEAR */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                fullWidth
                value={filterByMonthAndYearState}
                onChange={(date) => {
                  setOnDateFieldClose(false);
                  setFilterByMonthAndYearState(date);
                }}
                label={'Filtered By Month and Year'}
                views={['month', 'year']}
                disableFuture
                onClose={() => {
                  setOnDateFieldClose(true);
                }}
              />
            </LocalizationProvider>
          </Grid>

          {/* FILTER BY CURRENT MONTH / WEEK / YEAR */}
          <Grid item>
            <Stack direction="row" alignItems="center" spacing={0}>
              <Button
                size="small"
                onClick={() => setSlot('week')}
                color={slot === 'week' ? 'primary' : 'secondary'}
                variant={slot === 'week' ? 'outlined' : 'text'}
              >
                Week
              </Button>

              <Button
                size="small"
                onClick={() => setSlot('month')}
                color={slot === 'month' ? 'primary' : 'secondary'}
                variant={slot === 'month' ? 'outlined' : 'text'}
              >
                Month
              </Button>
              <Button
                size="small"
                onClick={() => setSlot('year')}
                color={slot === 'year' ? 'primary' : 'secondary'}
                variant={slot === 'year' ? 'outlined' : 'text'}
              >
                Year
              </Button>
            </Stack>
          </Grid>
        </Grid>

        {/* BILL CHART DATA */}
        <MainCard content={false} sx={{ mt: 1.5 }}>
          <Box sx={{ pt: 1, pr: 2 }}>
            <MonthlyBarChart
              slot={slot}
              monthlyBillData={monthlyBillData}
              weeklyBillData={weeklyBillData}
              yearlyBillData={yearlyBillData}
            />
          </Box>
        </MainCard>
      </Grid>

      {/* INCOME OVERVIEW CHART */}
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Income Overview</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Stack spacing={2}>
              <Typography variant="h6" color="textSecondary">
                This Week Statistics
              </Typography>
              <Typography variant="h3">{weeklyBillData?.reduce((acc, curr) => (acc += curr.total), 0)}</Typography>
            </Stack>
          </Box>
          <WeeklyBarChart weeklyBillData={weeklyBillData} />
        </MainCard>
      </Grid>
    </Grid>
  );
};

FilterChart.propTypes = {
  monthlyBillData: PropTypes.array,
  weeklyBillData: PropTypes.array,
  yearlyBillData: PropTypes.array,
  filterByMonthAndYearState: PropTypes.object,
  setFilterByMonthAndYearState: PropTypes.func,
  setOnDateFieldClose: PropTypes.func
};

export default FilterChart;
