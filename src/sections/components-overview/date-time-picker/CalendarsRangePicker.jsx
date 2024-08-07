import { useState } from 'react';

// material-ui
import { Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

// project import
import MainCard from 'components/MainCard';
import dayjs from 'dayjs';

// ==============================|| DATE PICKER - NO. OF CALENDERS ||============================== //

export default function CalendarsRangePicker() {
  const [value, setValue] = useState([null, null]);

  const calDatepickerCodeString = `<LocalizationProvider dateAdapter={AdapterDayjs}>
  <Typography sx={{ mt: 2, mb: 1 }}>1 calendar </Typography>
  <DateRangePicker
    calendars={1}
    value={value}
    onChange={(newValue) => {
      setValue(newValue);
    }}
  />
  <Typography sx={{ mt: 2, mb: 1 }}>2 calendars</Typography>
  <DateRangePicker
    calendars={2}
    value={value}
    onChange={(newValue) => {
      setValue(newValue);
    }}
  />
  <Typography sx={{ mt: 2, mb: 1 }}>3 calendars</Typography>
  <DateRangePicker
    calendars={3}
    value={value}
    onChange={(newValue) => {
      setValue(newValue);
    }}
  />
</LocalizationProvider>`;

  return (
    <MainCard title="Calendars Range Picker" codeString={calDatepickerCodeString}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Typography sx={{ mt: 2, mb: 1 }}>1 calendar </Typography>
        <DateRangePicker
          calendars={1}
          value={value}
          onChange={(newValue) => {
            setValue(dayjs(newValue));
          }}
        />
        <Typography sx={{ mt: 2, mb: 1 }}>2 calendars</Typography>
        <DateRangePicker
          calendars={2}
          value={value}
          onChange={(newValue) => {
            setValue(dayjs(newValue));
          }}
        />
        <Typography sx={{ mt: 2, mb: 1 }}>3 calendars</Typography>
        <DateRangePicker
          calendars={3}
          value={value}
          onChange={(newValue) => {
            setValue(dayjs(newValue));
          }}
        />
      </LocalizationProvider>
    </MainCard>
  );
}
