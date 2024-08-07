import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';

import { MenuFoldOutlined } from '@ant-design/icons';
import {
  Autocomplete,
  Button,
  Checkbox,
  Fade,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  TextField,
  Tooltip,
  useTheme
} from '@mui/material';
import LoadingButton from 'components/@extended/LoadingButton';
import { Controller } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { SendOutlined } from '@mui/icons-material';
import { isAfter } from 'date-fns';
import { DateRangePicker } from 'rsuite';

const drawerWidth = { xs: '70%', md: '30%', lg: '30%' };

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}));

/**
 * FilterDrawer Component
 *
 * This component represents a filter drawer for a data table. It provides UI elements
 * for users to apply filters to the displayed data. The filters include various input
 * types such as text fields, date pickers, checkboxes, and more.
 *
 * @component
 * @example
 *
 * // Example usage of FilterDrawer
 *
 *
 * const MyComponent = () => {
 *  // -> Default Initial state
 *  const FILTER_DEFAULT_VALUE = { ...defaultValue object};
 *
 *  // -> DEFAULT VALUE STATE
 *  const [filterDefaultValues, setFilterDefaultValues] = useState(FILTER_DEFAULT_VALUE);
 *
 *  // -> TABLE DATA STATE
 *  const [tableData, setTableData] = useState([]);
 *
 *  // -> DIALOGUE STATUS HANDLER
 *  const {
 *    drawerOpen,
 *    handleDrawerClose,
 *    handleDrawerOpen
 *  } = useDialog();
 *
 *  // ====================== FILTER AREA ======================
 *  const filterValidationSchema = {...yup validation schema};
 *
 *  // -> REACT HOOK FORM CUSTOM HOOK
 *  const { control,  handleSubmit, watch } = useFormHook({
 *     validationSchema: filterValidationSchema,
 *     defaultValuesProp: filterDefaultValues
 *  });
 *
 *  const filterFormData = [...{input field objects}];
 *
 *  // -> TABLE DATA
 *  const mainTableData = useMemo(() => tableData, [tableData]);
 *
 *  return (
 *     <FilterDrawer
 *         {...{
              handleDrawerClose,
              drawerOpen,
              filterFormData,
              formId: filteredFormId,
              column: { xs: 1, sm: 1, md: 2, lg: 2 },
              data: data?.clients,
              isServerFilter,
              setTableData,
              handleApplyFilterSubmit: isServerFilter ? handleApplyFilterSubmit : clientHandleApplyFilterSubmit,
              getDataQueryParams: {
                ...getDataQueryParams,
                ...{ limit: pageSize }
              },
              control,
              handleSubmit,
              reset,
              setData
            }}
 *     ></FilterDrawer>
 *   );
 * };
 **/
const FilterDrawer = React.forwardRef(
  (
    {
      handleDrawerClose = () => {},
      drawerOpen = () => {},
      filterFormData = [],
      formId = '',
      column = { xs: 1, sm: 1, md: 1, lg: 1 },
      isLoading,
      children,
      handleApplyFilterSubmit,
      control,
      handleSubmit = () => {},
      handleFilterReset
    },
    ref
  ) => {
    //common input types
    const commonInputTypes = ['text', 'email', 'number'];

    const theme = useTheme();

    return (
      <Box role="presentation" ref={ref} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ClickAwayListener mouseEvent="onMouseDown" touchEvent="onTouchStart" onClickAway={() => drawerOpen && handleDrawerClose()}>
          <Drawer
            open={drawerOpen}
            sx={{
              width: drawerWidth,
              overflowY: 'auto',
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                height: '90%',
                top: '8%'
              }
            }}
            variant="persistent"
            anchor="right"
          >
            <DrawerHeader sx={{ justifyContent: 'space-between' }}>
              <Tooltip title="close" TransitionComponent={Fade}>
                <IconButton size="large" onClick={handleDrawerClose}>
                  {<MenuFoldOutlined />}
                </IconButton>
              </Tooltip>
            </DrawerHeader>
            <Divider />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack
                component={'form'}
                onSubmit={handleSubmit(handleApplyFilterSubmit)}
                id={formId}
                direction="column"
                justifyContent="space-between"
                p={2}
                height="90%"
                alignItems="center"
              >
                <Grid container spacing={2}>
                  {filterFormData.length > 0 &&
                    filterFormData.map((item) => {
                      if (item.visibility) {
                        const itemColumn = item.column || column;
                        if (commonInputTypes.includes(item.type)) {
                          return (
                            <Grid
                              key={item.id}
                              item
                              xs={12 / itemColumn['xs']}
                              sm={12 / itemColumn['sm']}
                              md={12 / itemColumn['md']}
                              lg={12 / itemColumn['lg']}
                            >
                              <InputLabel color="error" required={item.required}>
                                {item.label}
                              </InputLabel>

                              <Controller
                                control={control}
                                name={item.name}
                                render={({ field, fieldState: { error } }) => (
                                  <TextField
                                    {...field}
                                    size={item.size}
                                    inputRef={field.ref}
                                    type={item.type}
                                    placeholder={item.placeholder}
                                    value={field.value}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    error={Boolean(error)}
                                    helperText={error?.message}
                                    disabled={item.disabled}
                                    fullWidth
                                    {...(item.type === 'textarea' && {
                                      multiline: true,
                                      minRows: 5
                                    })}
                                    inputProps={{
                                      ...(item.type === 'number' && { onWheel: (e) => e.currentTarget.blur() })
                                    }}
                                  />
                                )}
                              />
                            </Grid>
                          );
                        } else if (item.type === 'single-select') {
                          return (
                            <Grid
                              item
                              key={item.id}
                              xs={12 / itemColumn['xs']}
                              sm={12 / itemColumn['sm']}
                              md={12 / itemColumn['md']}
                              lg={12 / itemColumn['lg']}
                            >
                              <InputLabel required={item.required}>{item.label}</InputLabel>
                              <Controller
                                control={control}
                                name={item.name}
                                render={({ field, fieldState: { error } }) => {
                                  return (
                                    <>
                                      <Autocomplete
                                        id={item.id}
                                        onChange={(_event, data) => field.onChange(data?.value)}
                                        value={item.options?.find((item) => item.value === field?.value) || null}
                                        options={item.options}
                                        disabled={item.disabled}
                                        fullWidth
                                        size={item.size}
                                        renderInput={(params) => (
                                          <TextField
                                            {...params}
                                            inputMode={field.ref}
                                            placeholder={item.placeholder}
                                            sx={{
                                              '& .MuiAutocomplete-input.Mui-disabled': { WebkitTextFillColor: theme.palette.text.primary }
                                            }}
                                            error={Boolean(error)}
                                          />
                                        )}
                                      />
                                      {Boolean(error) && (
                                        <FormHelperText error id={item.id}>
                                          {error?.message}
                                        </FormHelperText>
                                      )}
                                    </>
                                  );
                                }}
                              />
                            </Grid>
                          );
                        } else if (item.type === 'date-picker') {
                          return (
                            <Grid
                              item
                              key={item.id}
                              xs={12 / itemColumn['xs']}
                              sm={12 / itemColumn['sm']}
                              md={12 / itemColumn['md']}
                              lg={12 / itemColumn['lg']}
                            >
                              <InputLabel required={item.required}>{item.label}</InputLabel>
                              <Controller
                                control={control}
                                name={item.name}
                                render={({ field, fieldState: { error } }) => {
                                  return (
                                    <>
                                      <DatePicker
                                        format="DD-MM-YYYY"
                                        value={field.value}
                                        inputRef={field.ref}
                                        disabled={item.disabled}
                                        onChange={(date) => {
                                          const getISOStringDate = date ? date.toISOString() : null;
                                          return field.onChange(getISOStringDate);
                                        }}
                                        minDate={item.minDate ? dayjs(new Date()) : null}
                                        maxDate={item.maxDate ? dayjs(new Date()) : null}
                                        slotProps={{
                                          textField: {
                                            fullWidth: true,
                                            error: Boolean(error),
                                            size: item.size
                                          }
                                        }}
                                      />

                                      {Boolean(error) && (
                                        <FormHelperText error id={item.id}>
                                          {error?.message}
                                        </FormHelperText>
                                      )}
                                    </>
                                  );
                                }}
                              />
                            </Grid>
                          );
                        } else if (item.type === 'date-range-picker') {
                          return (
                            <Grid
                              item
                              key={item.id}
                              xs={12 / itemColumn['xs']}
                              sm={12 / itemColumn['sm']}
                              md={12 / itemColumn['md']}
                              lg={12 / itemColumn['lg']}
                            >
                              <InputLabel required={item.required}>{item.label}</InputLabel>
                              <Controller
                                control={control}
                                name={item.name}
                                render={({ field, fieldState: { error } }) => {
                                  return (
                                    <>
                                      <DateRangePicker
                                        block
                                        {...(item.disabledFuture && { ...{ shouldDisableDate: (date) => isAfter(date, new Date()) } })}
                                        placement="auto"
                                        value={field.value}
                                        onChange={field.onChange}
                                        showOneCalendar
                                        disabled={item.disabled}
                                        placeholder={item.placeholder}
                                        format={item.format || 'dd-MM-yyyy'}
                                        size={item.size}
                                        ranges={item.ranges}
                                        onError={(error) => console.log(error)}
                                      />

                                      {Boolean(error) && (
                                        <FormHelperText error id={item.id}>
                                          {error?.message}
                                        </FormHelperText>
                                      )}
                                    </>
                                  );
                                }}
                              />
                            </Grid>
                          );
                        } else if (item.type === 'time-picker') {
                          return (
                            <Grid
                              item
                              key={item.id}
                              xs={12 / itemColumn['xs']}
                              sm={12 / itemColumn['sm']}
                              md={12 / itemColumn['md']}
                              lg={12 / itemColumn['lg']}
                            >
                              <InputLabel required={item.required}>{item.label}</InputLabel>
                              <Controller
                                name={item.name}
                                control={control}
                                render={({ field, fieldState: { error } }) => {
                                  return (
                                    <>
                                      <TimePicker
                                        ampm={true}
                                        openTo="hours"
                                        ref={field.ref}
                                        onChange={(date) => field.onChange(date)}
                                        views={['hours', 'minutes']}
                                        disabled={item.disabled}
                                        format="HH:mm"
                                        value={dayjs(field.value)}
                                        slotProps={{
                                          textField: {
                                            fullWidth: true,
                                            error: Boolean(error),
                                            size: item.size
                                          }
                                        }}
                                      />
                                      {Boolean(error) && (
                                        <FormHelperText error id={item.id}>
                                          {error?.message}
                                        </FormHelperText>
                                      )}
                                    </>
                                  );
                                }}
                              />
                            </Grid>
                          );
                        } else if (item.type === 'checkbox') {
                          return (
                            <Grid
                              item
                              key={item.id}
                              xs={12 / itemColumn['xs']}
                              sm={12 / itemColumn['sm']}
                              md={12 / itemColumn['md']}
                              lg={12 / itemColumn['lg']}
                            >
                              <InputLabel required={item.required}>{item.label}</InputLabel>
                              <Controller
                                name={item.name}
                                control={control}
                                defaultValue={[]}
                                render={({ field, fieldState: { error } }) => {
                                  return (
                                    <>
                                      <Stack
                                        {...field}
                                        direction={item.direction}
                                        component={FormGroup}
                                        onChange={({ target: { checked, value } }) => {
                                          if (checked) {
                                            field.onChange([...field.value, value]);
                                          } else {
                                            field.onChange(field.value.filter((element) => element !== value));
                                          }
                                        }}
                                      >
                                        {item.options.map((option) => {
                                          return (
                                            <FormControlLabel
                                              key={option.value}
                                              value={option.value}
                                              control={<Checkbox size={item.size} />}
                                              label={option.label}
                                              disabled={item.disabled ? item.disabled : option.disabled}
                                              labelPlacement="end"
                                              checked={field.value.includes(option.value)}
                                            />
                                          );
                                        })}
                                      </Stack>
                                      {Boolean(error) && (
                                        <FormHelperText error id={item.id}>
                                          {error?.message}
                                        </FormHelperText>
                                      )}
                                    </>
                                  );
                                }}
                              />
                            </Grid>
                          );
                        } else if (item.type === 'single-checkbox') {
                          return (
                            <Grid
                              item
                              key={item.id}
                              xs={12 / itemColumn['xs']}
                              sm={12 / itemColumn['sm']}
                              md={12 / itemColumn['md']}
                              lg={12 / itemColumn['lg']}
                            >
                              {/* <InputLabel required={item.required}>{item.label}</InputLabel> */}
                              <Controller
                                name={item.name}
                                control={control}
                                render={({ field, fieldState: { error } }) => {
                                  return (
                                    <>
                                      <Stack
                                        {...field}
                                        direction={item.direction}
                                        component={FormGroup}
                                        onChange={({ target: { checked } }) => {
                                          field.onChange(checked);
                                        }}
                                      >
                                        <FormControlLabel
                                          key={field.value}
                                          value={field.value}
                                          control={<Checkbox size={item.size} />}
                                          label={item.label}
                                          disabled={item.disabled}
                                          labelPlacement="end"
                                          checked={field.value}
                                        />
                                      </Stack>
                                      {Boolean(error) && (
                                        <FormHelperText error id={item.id}>
                                          {error?.message}
                                        </FormHelperText>
                                      )}
                                    </>
                                  );
                                }}
                              />
                            </Grid>
                          );
                        } else if (item.type === 'radio') {
                          return (
                            <Grid
                              item
                              key={item.id}
                              xs={12 / itemColumn['xs']}
                              sm={12 / itemColumn['sm']}
                              md={12 / itemColumn['md']}
                              lg={12 / itemColumn['lg']}
                            >
                              <InputLabel required={item.required}>{item.label}</InputLabel>
                              <Controller
                                name={item.name}
                                control={control}
                                render={({ field, fieldState: { error } }) => {
                                  return (
                                    <>
                                      <RadioGroup
                                        {...field}
                                        aria-label={item.label}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        row={item.direction === 'row'}
                                        value={field.value}
                                      >
                                        {item.options.map((option) => {
                                          return (
                                            <FormControlLabel
                                              key={option.value}
                                              value={option.value}
                                              disabled={item.disabled ? item.disabled : option.disabled}
                                              control={<Radio size={item.size} />}
                                              label={option.label}
                                              labelPlacement="end"
                                              checked={field.value === option.value}
                                            />
                                          );
                                        })}
                                      </RadioGroup>
                                      {Boolean(error) && (
                                        <FormHelperText error id={item.id}>
                                          {error?.message}
                                        </FormHelperText>
                                      )}
                                    </>
                                  );
                                }}
                              />
                            </Grid>
                          );
                        } else if (item.type === 'switch') {
                          <Grid
                            item
                            key={item.id}
                            xs={12 / itemColumn['xs']}
                            sm={12 / itemColumn['sm']}
                            md={12 / itemColumn['md']}
                            lg={12 / itemColumn['lg']}
                          >
                            <InputLabel required={item.required}>{item.label}</InputLabel>
                            <Controller
                              name={item.name}
                              control={control}
                              render={({ field, fieldState: { error } }) => {
                                return (
                                  <>
                                    <FormControlLabel
                                      {...field}
                                      disabled={item.disabled}
                                      control={<Switch defaultChecked sx={{ mt: 0 }} />}
                                      label=""
                                      labelPlacement="start"
                                    />
                                    {Boolean(error) && (
                                      <FormHelperText error id={item.id}>
                                        {error?.message}
                                      </FormHelperText>
                                    )}
                                  </>
                                );
                              }}
                            />
                          </Grid>;
                        } else {
                          return null;
                        }
                      }
                    })}
                  <Grid item xs={12}>
                    {children}
                  </Grid>
                </Grid>
                <Stack
                  direction="row"
                  position="sticky"
                  bottom={0}
                  sx={{ backgroundColor: 'background.paper', zIndex: 1, borderTop: '1px solid gray' }}
                  justifyContent="center"
                  spacing={0.5}
                  width="100%"
                  padding={2}
                >
                  <Button type="button" size="small" variant="contained" color="error" onClick={handleFilterReset}>
                    Reset
                  </Button>
                  <LoadingButton
                    loading={isLoading}
                    color="primary"
                    disabled={isLoading}
                    variant="contained"
                    loadingPosition="end"
                    endIcon={<SendOutlined />}
                    type="submit"
                  >
                    Apply
                  </LoadingButton>
                </Stack>
              </Stack>
            </LocalizationProvider>
          </Drawer>
        </ClickAwayListener>
      </Box>
    );
  }
);

export default FilterDrawer;

FilterDrawer.propTypes = {
  handleDrawerClose: PropTypes.func,
  drawerOpen: PropTypes.bool,
  children: PropTypes.node,
  filterFormData: PropTypes.array,
  filterDefaultValues: PropTypes.object,
  setFilterDefaultValues: PropTypes.func,
  formId: PropTypes.string,
  isLoading: PropTypes.bool,
  column: PropTypes.object,
  data: PropTypes.array,
  setTableData: PropTypes.func,
  control: PropTypes.object,
  handleSubmit: PropTypes.func,
  handleApplyFilterSubmit: PropTypes.func,
  isServerFilter: PropTypes.bool,
  getDataQueryParams: PropTypes.object,
  reset: PropTypes.func,
  setData: PropTypes.func,
  handleFilterReset: PropTypes.func
};
