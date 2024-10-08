import { useState } from 'react';

// material-ui
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// project import
import MainCard from 'components/MainCard';

// ==============================|| DATE PICKER - HELPER TEXT ||============================== //

export default function HelperText() {
  const [value, setValue] = useState(null);

  const helperDatepickerCodeString = `<LocalizationProvider dateAdapter={AdapterDayjs}>
  <DatePicker
    label="Helper Text"
    value={value}
    onChange={(newValue) => {
      setValue(newValue);
    }}
    slotProps={{
      textField: {
        helperText: 'Helper Text'
      }
    }}
  />
</LocalizationProvider>`;

  return (
    <MainCard title="Helper Text" codeString={helperDatepickerCodeString}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Helper Text"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          slotProps={{
            textField: {
              helperText: 'Helper Text'
            }
          }}
        />
      </LocalizationProvider>
    </MainCard>
  );
}
