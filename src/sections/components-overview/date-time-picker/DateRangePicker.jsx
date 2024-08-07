import { useState } from 'react';

// material-ui
import { Stack } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDateRangePicker } from '@mui/x-date-pickers-pro/MobileDateRangePicker';
import { DesktopDateRangePicker } from '@mui/x-date-pickers-pro/DesktopDateRangePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// project import
import MainCard from 'components/MainCard';

// ==============================|| DATE PICKER - DATE RANGE ||============================== //

export default function DateRangePicker() {
  const [value, setValue] = useState([null, null]);

  const rangeDatepickerCodeString = `<LocalizationProvider dateAdapter={AdapterDayjs} localeText={{ start: 'Mobile start', end: 'Mobile end' }}>
  <MobileDateRangePicker
    value={value}
    onChange={(newValue) => {
      setValue(newValue);
    }}
  />
</LocalizationProvider>
<LocalizationProvider dateAdapter={AdapterDayjs} localeText={{ start: 'Desktop start', end: 'Desktop end' }}>
  <DesktopDateRangePicker
    value={value}
    onChange={(newValue) => {
      setValue(newValue);
    }}
  />
</LocalizationProvider>`;

  return (
    <MainCard title="Date Range Picker" codeString={rangeDatepickerCodeString}>
      <Stack spacing={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs} localeText={{ start: 'Mobile start', end: 'Mobile end' }}>
          <MobileDateRangePicker
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs} localeText={{ start: 'Desktop start', end: 'Desktop end' }}>
          <DesktopDateRangePicker
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
          />
        </LocalizationProvider>
      </Stack>
    </MainCard>
  );
}
