import { useState } from 'react';

// material-ui
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import enGB from 'dayjs/locale/en-gb';
import zhCN from 'dayjs/locale/zh-cn';
import de from 'dayjs/locale/de';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { DateField } from '@mui/x-date-pickers/DateField';
import { TimeField } from '@mui/x-date-pickers/TimeField';

// project import
import MainCard from 'components/MainCard';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// Extend dayjs with customParseFormat plugin
dayjs.extend(customParseFormat);

const locales = { 'en-us': undefined, 'en-gb': enGB, 'zh-cn': zhCN, de };

// ==============================|| DATE PICKER - LOCALIZED ||============================== //

export default function LocalizedPicker() {
  const [locale, setLocale] = useState('en-us');

  const localizeDatepickerCodeString = `<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locales[locale]}>
  <Stack spacing={3} sx={{ width: 300 }}>
    <ToggleButtonGroup value={locale} exclusive fullWidth onChange={(event, newLocale) => setLocale(newLocale)}>
      {Object.keys(locales).map((localeItem) => (
        <ToggleButton key={localeItem} value={localeItem}>
          {localeItem}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
    <DateField label="Date" defaultValue={new Date('2022-04-17')} />
    <TimeField label="Time" defaultValue={new Date('2022-04-17T18:30')} />
  </Stack>
</LocalizationProvider>`;

  return (
    <MainCard title="Localization Picker" codeString={localizeDatepickerCodeString}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locales[locale]}>
        <Stack spacing={3} sx={{ width: 300 }}>
          <ToggleButtonGroup value={locale} exclusive fullWidth onChange={(event, newLocale) => setLocale(newLocale)}>
            {Object.keys(locales).map((localeItem) => (
              <ToggleButton key={localeItem} value={localeItem}>
                {localeItem}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <DateField label="Date" defaultValue={new Date('2022-04-17')} />
          <TimeField label="Time" defaultValue={new Date('2022-04-17T18:30')} />
        </Stack>
      </LocalizationProvider>
    </MainCard>
  );
}
