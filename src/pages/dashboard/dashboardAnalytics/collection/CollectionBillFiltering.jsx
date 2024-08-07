import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useGetBillQuery } from 'api/service/dashboard.service';
import { Button } from '@mui/material';

const CollectionBillFiltering = () => {
  const { data: billData } = useGetBillQuery();

  const [monthly, setMonthly] = React.useState('');
  const [yearly, setYearly] = React.useState('');
  const [weekly, setWeekly] = React.useState('');

  const handleMonthly = (event) => {
    setMonthly(event.target.value);
  };

  const handleYearly = (event) => {
    setYearly(event.target.value);
  };

  const months = [
    {
      label: 'January',
      value: 0
    },
    {
      label: 'February',
      value: 1
    },
    {
      label: 'March',
      value: 2
    },
    {
      label: 'April',
      value: 3
    },
    {
      label: 'May',
      value: 4
    },
    {
      label: 'June',
      value: 5
    },
    {
      label: 'July',
      value: 6
    },
    {
      label: 'August',
      value: 7
    },
    {
      label: 'September',
      value: 8
    },
    {
      label: 'October',
      value: 9
    },
    {
      label: 'November',
      value: 10
    },
    {
      label: 'December',
      value: 11
    }
  ];

  const years = [
    {
      label: 2024,
      value: 2024
    },
    {
      label: 2025,
      value: 2025
    },
    {
      label: 2026,
      value: 2026
    },
    {
      label: 2027,
      value: 2027
    }
  ];

  return (
    <Box sx={{ minWidth: 200, display: 'flex', gap: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Monthly </InputLabel>

        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={monthly} label="Monthly" onChange={handleMonthly}>
          {months.map((item, index) => {
            return (
              <MenuItem key={index} value={item.value}>
                {item?.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Yearly </InputLabel>

        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={yearly} label="Yearly" onChange={handleYearly}>
          {years.map((item, index) => {
            return (
              <MenuItem key={index} value={item.value}>
                {item?.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <Button variant="outlined">Fillter</Button>
    </Box>
  );
};
export default CollectionBillFiltering;
