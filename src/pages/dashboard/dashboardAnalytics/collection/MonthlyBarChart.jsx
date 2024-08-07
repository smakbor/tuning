import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// project import
import { ThemeMode } from 'config';
import useConfig from 'hooks/useConfig';
import dayjs from 'dayjs';
import month from 'utils/date-json/month.json';

// chart options
const areaChartOptions = {
  chart: {
    height: 450,
    type: 'area',
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  grid: {
    strokeDashArray: 0
  }
};

// ==============================|| INCOME AREA CHART ||============================== //

const MonthlyBarChart = ({ slot, monthlyBillData, weeklyBillData, yearlyBillData }) => {
  const theme = useTheme();
  const { mode } = useConfig();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);

  const allMonth = month.month;

  const daysInMonth = [];
  for (let i = 0; i < dayjs().daysInMonth(); i++) {
    daysInMonth.push(i + 1);
  }

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.primary.main, theme.palette.warning.main],
      xaxis: {
        ...(slot === 'month' && {
          categories: daysInMonth
        }),
        ...(slot === 'week' && {
          categories: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
        }),
        ...(slot === 'year' && {
          categories: allMonth.map((item) => item.name)
        }),
        labels: {
          style: {
            colors: [primary, secondary, primary, secondary, primary, secondary, primary, secondary, primary, secondary, primary, secondary]
          }
        },
        axisBorder: {
          show: true,
          color: line
        },
        ...(slot === 'week' && { tickAmount: 7 }),
        ...(slot === 'month' && { tickAmount: 30 }),
        ...(slot === 'year' && { tickAmount: 11 })
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary]
          }
        }
      },
      grid: {
        borderColor: line
      },
      theme: {
        mode: mode === ThemeMode.DARK ? 'dark' : 'light'
      }
    }));
  }, [mode, primary, secondary, line, theme, slot]);

  const billChartData = {
    name: 'Amount',
    ...(slot === 'week' && { data: weeklyBillData.map((item) => item.total) }),
    ...(slot === 'month' && { data: monthlyBillData.map((item) => item.total) }),
    ...(slot === 'year' && { data: yearlyBillData.map((item) => item.total) })
  };
  const amountChartData = {
    name: 'Bill',
    ...(slot === 'week' && { data: weeklyBillData.map((item) => item.count) }),
    ...(slot === 'month' && { data: monthlyBillData.map((item) => item.count) }),
    ...(slot === 'year' && { data: yearlyBillData.map((item) => item.count) })
  };

  const series = [billChartData, amountChartData];

  return <ReactApexChart options={options} series={series} type="area" height={450} />;
};

MonthlyBarChart.propTypes = {
  slot: PropTypes.string,
  monthlyBillData: PropTypes.array,
  weeklyBillData: PropTypes.array,
  yearlyBillData: PropTypes.array
};

export default MonthlyBarChart;
