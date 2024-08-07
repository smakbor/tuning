import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// project import
import { ThemeMode } from 'config';
import useConfig from 'hooks/useConfig';
import PropTypes from 'prop-types';

// third-party
import ReactApexChart from 'react-apexcharts';

// ==============================|| USER CARD CHART ||============================== //

const UsersCardChart = ({ monthlyBillData }) => {
  const theme = useTheme();
  const { mode } = useConfig();

  // chart options
  const areaChartOptions = {
    chart: {
      id: 'new-stack-chart',
      sparkline: {
        enabled: true
      },
      height: 100,
      type: 'bar',
      toolbar: {
        show: false
      },
      offsetX: -4
    },
    dataLabels: {
      enabled: false
    },
    plotOptions: {
      bar: {
        columnWidth: '80%'
      }
    },
    tooltip: {
      x: {
        show: false
      },
      y: {
        formatter(val) {
          return `${val} TK`;
        }
      }
    }
  };

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);

  // console.log({ monthlyBillData });

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.primary.main, theme.palette.primary[700]],
      theme: {
        mode: mode === ThemeMode.DARK ? 'dark' : 'light'
      }
    }));
  }, [mode, primary, secondary, line, theme]);

  const [series] = useState([
    {
      name: 'Bill',
      data: monthlyBillData?.map((item) => item.total)
    }
  ]);

  return <ReactApexChart options={options} series={series} type="bar" height={100} />;
};

UsersCardChart.propTypes = {
  monthlyBillData: PropTypes.array
};

export default UsersCardChart;
