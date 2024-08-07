import {
  Autocomplete,
  Badge,
  Box,
  Button,
  Checkbox,
  Chip,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography,
  styled
} from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import { CloseOutlined, PlusCircleOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { DatePicker, DateTimePicker, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import Avatar from 'components/@extended/Avatar';
import useDialog from '../hooks/useDialog';
import CropImage from './CropImage';
import CreatableSelect from 'react-select/creatable';
import './Input.css';
import { useTheme } from '@mui/material/styles';
import PasswordField from './PasswordField';
// import { DateRangePicker } from 'rsuite';

// file input style
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
});

const RenderInputWithHeader = (header, inputComponent) => {
  return inputComponent;
};

function InputFiled({ formData, column, control, commonInputTypes, theme, handleManageProduct, handleRemoveAllProduct }) {
  const styleTheme = useTheme();
  // -> HOOKS
  const { handleDialogClose, open, handleDialogOpen } = useDialog();

  // -> STATE
  const [hasImgSrc, setHasImgSrc] = React.useState(false);

  const AllInput = [];

  formData.forEach((item) => {
    let inputComponent = '';

    if (item?.visibility) {
      const itemColumn = item.column || column;

      if (commonInputTypes.includes(item.type)) {
        inputComponent = (
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
              key={item.id}
              control={control}
              name={item.name}
              defaultValue=""
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  size={item.size}
                  inputRef={field.ref}
                  type={item.type}
                  placeholder={item.placeholder}
                  value={field.value}
                  onChange={(e) => (item.extraOnchange ? item.extraOnchange(e.target.value) : field.onChange(e.target.value))}
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
                  InputProps={{
                    startAdornment: item.startAdornment && <InputAdornment position="start">{item.icon}</InputAdornment>,
                    endAdornment: item.endAdornment && <InputAdornment position="end">{item.icon}</InputAdornment>
                  }}
                />
              )}
            />
          </Grid>
        );
      } else if (item.type === 'file') {
        inputComponent = (
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
              key={item.id}
              control={control}
              name={item.name}
              render={({ field: { onChange, value, ref }, fieldState: { error } }) => {
                return (
                  <>
                    <Stack ref={ref} direction="row" gap={2} alignItems="center">
                      <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                        {value ? 'Update Image' : 'Upload Image'}
                        <VisuallyHiddenInput
                          type="file"
                          onChange={(event) => {
                            onChange(event.target.files[0]);
                            setHasImgSrc(true);
                          }}
                        />
                      </Button>
                      {value && (
                        <>
                          <Badge
                            badgeContent={
                              <Tooltip title="Delete Image" placement="top" arrow>
                                <CloseOutlined
                                  onClick={() => {
                                    onChange(null);
                                  }}
                                />
                              </Tooltip>
                            }
                            color="error"
                            overlap="circular"
                          >
                            <Avatar
                              sx={{
                                cursor: 'pointer',
                                '&:hover': {
                                  backgroundColor: 'darkgrey'
                                }
                              }}
                              type="filled"
                              src={value && URL.createObjectURL(value)}
                            />
                          </Badge>

                          {/* CROP IMAGE MODAL  */}
                          <CropImage
                            {...{
                              handleDialogClose,
                              handleDialogOpen,
                              onChange,
                              open,
                              hasImgSrc,
                              setHasImgSrc,
                              imgSrc: value
                            }}
                          />
                        </>
                      )}
                    </Stack>
                    {Boolean(error) && (
                      <FormHelperText error id={item.id}>
                        {error?.file?.name?.message}
                      </FormHelperText>
                    )}
                  </>
                );
              }}
            />
          </Grid>
        );
      } else if (item.type === 'password') {
        inputComponent = (
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
              key={item.id}
              control={control}
              name={item.name}
              defaultValue=""
              render={({ field, fieldState: { error } }) => (
                <>
                  {/* <OutlinedInput
                    {...field}
                    size={item.size}
                    inputRef={field.ref}
                    placeholder={item.placeholder}
                    value={field.value}
                    onChange={(e) => (item.extraOnchange ? item.extraOnchange(e.target.value) : field.onChange(e.target.value))}
                    error={Boolean(error)}
                    disabled={item.disabled}
                    type={showPassword ? 'text' : item.type}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          onMouseDown={(e) => e.preventDefault()}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    fullWidth
                    {...(item.type === 'textarea' && {
                      multiline: true,
                      minRows: 5
                    })}
                    inputProps={{
                      ...(item.type === 'number' && { onWheel: (e) => e.currentTarget.blur() })
                    }}
                  /> */}
                  <PasswordField field={field} item={item} error={error} />

                  {Boolean(error) && (
                    <FormHelperText error id={item.id}>
                      {error?.message}
                    </FormHelperText>
                  )}
                </>
              )}
            />
          </Grid>
        );
      } else if (item.type === 'single-select') {
        inputComponent = (
          <Grid
            item
            key={item.id}
            xs={12 / itemColumn['xs']}
            sm={12 / itemColumn['sm']}
            md={12 / itemColumn['md']}
            lg={12 / itemColumn['lg']}
          >
            <Stack direction="row" alignItems="center" justifyContent="start">
              <InputLabel required={item.required}>{item.label}</InputLabel>

              {item?.addNew && (
                <Tooltip title={`Add New ${item.label}`} placement="top" arrow>
                  <Box
                    sx={{
                      color: item?.disabled ? styleTheme.palette.text.secondary : styleTheme.palette.primary.main,
                      pointerEvents: item?.disabled ? 'none' : 'auto',
                      paddingLeft: 0.5,
                      cursor: 'pointer',
                      '&:hover': { color: styleTheme.palette.primary.dark }
                    }}
                    onClick={() => {
                      item?.addNewClickHandler();
                    }}
                    size="small"
                  >
                    <PlusCircleOutlined />
                  </Box>
                </Tooltip>
              )}
            </Stack>

            <Controller
              key={item.id}
              control={control}
              name={item.name}
              defaultValue=""
              render={({ field, fieldState: { error } }) => {
                return (
                  <>
                    <Autocomplete
                      id={item.id}
                      onChange={
                        item.extraOnchange
                          ? (onChangeData, option) => item.extraOnchange(option)
                          : (_event, data) => {
                              field.onChange(data?.value);
                            }
                      }
                      value={item.options?.find((item) => item.value === field?.value) || null}
                      options={item.options}
                      disabled={item.disabled}
                      fullWidth
                      size={item.size}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          // inputProps={{ inputMode: field.ref }}
                          // inputMode={field.ref}
                          placeholder={item.placeholder}
                          sx={{ '& .MuiAutocomplete-input.Mui-disabled': { WebkitTextFillColor: theme?.palette?.text.primary } }}
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
      } else if (item.type === 'multiple-select') {
        inputComponent = (
          <Grid
            key={item.id}
            item
            xs={12 / itemColumn['xs']}
            sm={12 / itemColumn['sm']}
            md={12 / itemColumn['md']}
            lg={12 / itemColumn['lg']}
          >
            <Stack direction="row" alignItems="center" justifyContent="start">
              <InputLabel required={item.required}>{item.label}</InputLabel>

              {item?.addNew && (
                <Tooltip title={`Add New ${item.label}`} placement="top" arrow>
                  <Box
                    sx={{
                      color: item?.disabled ? styleTheme.palette.text.secondary : styleTheme.palette.primary.main,
                      pointerEvents: item?.disabled ? 'none' : 'auto',
                      paddingLeft: 0.5,
                      cursor: 'pointer',
                      '&:hover': { color: styleTheme.palette.primary.dark }
                    }}
                    onClick={() => {
                      item?.addNewClickHandler();
                    }}
                    size="small"
                  >
                    <PlusCircleOutlined />
                  </Box>
                </Tooltip>
              )}
            </Stack>
            <Controller
              key={item.id}
              name={item.name}
              control={control}
              defaultValue=""
              render={({ field, fieldState: { error } }) => {
                return (
                  <>
                    <Autocomplete
                      id={item.id}
                      multiple
                      fullWidth
                      autoHighlight
                      size={item.size}
                      disableCloseOnSelect
                      disabled={item.disabled}
                      options={item.options}
                      onChange={
                        item.extraOnchange
                          ? (...onChangeData) => item.extraOnchange([...onChangeData], field)
                          : (_event, data) => {
                              if (data) {
                                field.onChange(data.map((option) => option.value));
                              } else {
                                field.onChange([]);
                              }
                            }
                      }
                      value={field.value ? item.options?.filter((option) => field.value.includes(option.value)) : []}
                      getOptionLabel={(option) => option.label}
                      renderInput={(params) => (
                        <TextField {...params} placeholder={item.placeholder} error={Boolean(error)} helperText={error?.message} />
                      )}
                      renderTags={(value, getTagProps) => {
                        return value.map((option, index) => {
                          return (
                            <Chip
                              key={index}
                              {...getTagProps({ index })}
                              variant="combined"
                              color={error ? 'error' : 'secondary'}
                              label={
                                <Typography variant="caption" color="secondary.dark">
                                  {option.label}
                                </Typography>
                              }
                              deleteIcon={<CloseOutlined style={{ fontSize: '0.875rem' }} />}
                              size="small"
                            />
                          );
                        });
                      }}
                    />
                    {/* //Suggestion Chips */}
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{ mt: 1.5, flexWrap: { xs: 'wrap', sm: 'inherit' }, gap: { xs: 1, sm: 0 } }}
                    >
                      {/* <Typography variant="caption">Suggestion:</Typography>
                      {item.options
                        .filter((item) => !field?.value?.includes(item.value))
                        .slice(0, 5)
                        .map((option, index) => (
                          <Chip
                            key={index}
                            variant="outlined"
                            disabled={item.disabled}
                            onClick={() => {
                              if (field.value) {
                                field.onChange([...field.value, option.value]);
                              } else {
                                field.onChange([]);
                              }
                            }}
                            label={<Typography variant="caption">{option.label}</Typography>}
                            size="small"
                          />
                        ))} */}
                    </Stack>
                  </>
                );
              }}
            />
          </Grid>
        );
      } else if (item.type === 'react-select') {
        inputComponent = (
          <Grid
            key={item.id}
            item
            xs={12 / itemColumn['xs']}
            sm={12 / itemColumn['sm']}
            md={12 / itemColumn['md']}
            lg={12 / itemColumn['lg']}
          >
            <InputLabel required={item.required}>{item.label}</InputLabel>
            <Controller
              key={item.id}
              name={item.name}
              control={control}
              defaultValue=""
              render={({ field, fieldState: { error } }) => {
                return (
                  <>
                    <CreatableSelect
                      {...field}
                      isClearable
                      isMulti
                      value={field.value ? item.options?.filter((option) => field.value.includes(option.value)) : []}
                      ref={field.ref}
                      options={item.options || []}
                      className="react-select-container"
                      classNamePrefix="react-select"
                      isDisabled={item.disabled}
                      placeholder={item.placeholder}
                      onChange={(value) => {
                        value = value ? value.map((item) => item.value) : [];
                        field.onChange(value);
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
      } else if (item.type === 'date-picker') {
        inputComponent = (
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
              key={item.id}
              control={control}
              name={item.name}
              render={({ field, fieldState: { error } }) => {
                return (
                  <>
                    <DatePicker
                      format={item.dateFormat || 'MMMM DD, YYYY'}
                      value={dayjs(field.value)}
                      inputRef={field.ref}
                      disabled={item.disabled}
                      onChange={(date) =>
                        item.extraOnchange ? item.extraOnchange(dayjs(date).toISOString()) : field.onChange(dayjs(date).toISOString())
                      }
                      minDate={item.minDate ? dayjs(item.minDate) : null}
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
      } else if (item.type === 'time-picker') {
        inputComponent = (
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
              key={item.id}
              name={item.name}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <TimePicker
                    ampm
                    openTo="hours"
                    ref={field.ref}
                    onChange={(date) => field.onChange(date)}
                    views={['hours', 'minutes']}
                    disabled={item.disabled}
                    format="h:mm a"
                    value={dayjs(field.value)}
                    minutesStep={item.minutesStep || 0}
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
              )}
            />
          </Grid>
        );
      } else if (item.type === 'date-time-picker') {
        inputComponent = (
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
              key={item.id}
              name={item.name}
              control={control}
              render={({ field, fieldState: { error } }) => {
                return (
                  <>
                    <DateTimePicker
                      inputRef={field.ref}
                      minutesStep={item.minutesStep || 0}
                      format={item.dateFormat || 'MMMM DD, YYYY h:mm A'}
                      timeSteps={{ hours: item.hour, minutes: item.minutes }}
                      value={dayjs(field.value)}
                      onChange={(date) => field.onChange(dayjs(date).toISOString())}
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
      } else if (item.type === 'date-time-picker-fixedTime') {
        inputComponent = (
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
              key={item.id}
              name={item.name}
              control={control}
              render={({ field, fieldState: { error } }) => {
                return (
                  <>
                    <DatePicker
                      inputRef={field.ref}
                      minutesStep={item.minutesStep || 0}
                      format={item.dateFormat || 'MMMM DD, YYYY h:mm A'}
                      value={dayjs(field.value).hour(item.hour).minute(item.minutes)}
                      onChange={(date) => {
                        const updatedDate = dayjs(date).hour(item.hour).minute(item.minutes);
                        field.onChange(updatedDate);
                      }}
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
        inputComponent = (
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
              key={item.id}
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
                      {item?.options?.map((option) => {
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
        inputComponent = (
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
              key={item.id}
              name={item.name}
              control={control}
              render={({ field, fieldState: { error } }) => {
                return (
                  <>
                    <Stack
                      {...field}
                      direction={item.direction}
                      component={FormGroup}
                      onChange={({ target: { checked, value } }) => {
                        // item.extraOnchange(checked, value);

                        return item.extraOnchange ? item.extraOnchange(checked, value) : field.onChange(checked);
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
        inputComponent = (
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
              key={item.id}
              name={item.name}
              control={control}
              defaultValue=""
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
        inputComponent = (
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
              key={item.id}
              name={item?.name}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Switch {...field} checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />
              )}
            />
          </Grid>
        );
      } else if (item.type === 'button') {
        inputComponent = (
          <Grid
            item
            key={item.id}
            xs={12 / itemColumn['xs']}
            sm={12 / itemColumn['sm']}
            md={12 / itemColumn['md']}
            lg={12 / itemColumn['lg']}
          >
            <Button onClick={handleManageProduct} variant="outlined" sx={{ mt: '1.3rem' }}>
              {item.label}
            </Button>
            {item?.isRemoveAllButton?.length > 0 && (
              <Button onClick={handleRemoveAllProduct} variant="outlined" color={item.color} sx={{ mt: '1.3rem', ml: '.8rem' }}>
                {'Remove All'}
              </Button>
            )}
          </Grid>
        );
      } else if (item.type === 'component') {
        inputComponent = (
          <>
            {item.visibility && (
              <Grid
                item
                key={item.id}
                xs={12 / itemColumn['xs']}
                sm={12 / itemColumn['sm']}
                md={12 / itemColumn['md']}
                lg={12 / itemColumn['lg']}
                spacing={1}
                gap={1}
              >
                <InputLabel sx={{ marginBottom: 1 }} required={item.required}>
                  {item.label}
                </InputLabel>
                {item.component}
              </Grid>
            )}
          </>
        );
      } else {
        return null;
      }
    }
    return AllInput.push(RenderInputWithHeader(item.header, inputComponent));
  });

  return AllInput;
}

InputFiled.propTypes = {
  formData: PropTypes.array,
  column: PropTypes.object,
  formSubmit: PropTypes.func,
  isUpdate: PropTypes.bool,
  isLoading: PropTypes.bool,
  control: PropTypes.object,
  handleSubmit: PropTypes.func,
  reset: PropTypes.func,
  setError: PropTypes.func,
  handleCloseDialog: PropTypes.func,
  commonInputTypes: PropTypes.array,
  theme: PropTypes.object
};

export default InputFiled;
