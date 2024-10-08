import { useState } from 'react';

// material-ui
import { Stack } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

// project import
import MainCard from 'components/MainCard';

// ==============================|| DATE PICKER - STATIC ||============================== //

export default function ComponentStaticDatePicker() {
  const [value, setValue] = useState(new Date());

  const staticDatepickerCodeString = `<LocalizationProvider dateAdapter={AdapterDayjs}>
  <StaticDatePicker
    displayStaticWrapperAs="desktop"
    openTo="year"
    value={value}
    onChange={(newValue) => {
      setValue(newValue);
    }}
  />
</LocalizationProvider>
<LocalizationProvider dateAdapter={AdapterDayjs}>
  <StaticDatePicker
    displayStaticWrapperAs="desktop"
    openTo="day"
    value={value}
    onChange={(newValue) => {
      setValue(newValue);
    }}
  />
</LocalizationProvider>`;

  return (
    <MainCard title="Static Mode" codeHighlight codeString={staticDatepickerCodeString}>
      <Stack spacing={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            openTo="year"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            openTo="day"
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
