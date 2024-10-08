import { useState } from 'react';

// material-ui
import { Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

import dayjs from 'dayjs';

// project import
import MainCard from 'components/MainCard';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// ==============================|| DATE PICKER - LANDSCAPE ||============================== //

export default function LandscapeDatePicker() {
  const [value, setValue] = useState(new Date());

  const landscapDatepickerCodeString = `<LocalizationProvider dateAdapter={AdapterDayjs}>
  <Box sx={{ '.MuiCalendarPicker-root': { width: '100%' }, '.MuiPickersCalendarHeader-labelContainer': { maxHeight: 40 } }}>
    <StaticDatePicker
      orientation="landscape"
      openTo="day"
      value={value}
      shouldDisableDate={dayjs.day() === 0 || dayjs.day() === 6}
      onChange={(newValue) => {
        setValue(newValue);
      }}
    />
  </Box>
</LocalizationProvider>`;

  return (
    <MainCard title="Landscape" codeString={landscapDatepickerCodeString}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ '.MuiCalendarPicker-root': { width: '100%' }, '.MuiPickersCalendarHeader-labelContainer': { maxHeight: 40 } }}>
          <StaticDatePicker
            orientation="landscape"
            openTo="day"
            value={value}
            shouldDisableDate={dayjs.day() === 0 || dayjs.day() === 6}
            onChange={(newValue) => {
              setValue(newValue);
            }}
          />
        </Box>
      </LocalizationProvider>
    </MainCard>
  );
}
