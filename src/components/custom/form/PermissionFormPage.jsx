/* eslint-disable react-hooks/exhaustive-deps */

import { Button, Divider, Grid, InputLabel, Stack, Switch, Typography } from '@mui/material';
import PropTypes from 'prop-types';

// assets
import MainCard from 'components/MainCard';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { SaveFilled } from '@ant-design/icons';
import LoadingButton from 'components/@extended/LoadingButton';
import InputFiled from './Inputs';
import { Controller } from 'react-hook-form';
import EditPermissionInput from 'pages/staff/employee/employee-profile/EditPermissionInput';

//================|| FORMS VALIDATION - ADDRESS================//
function PermissionFormPage({
  formTitle,
  formId,
  formSubmit,
  isUpdate,
  isLoading,
  handleSubmit,
  reset,
  formState,
  children,
  control,
  updateFormFieldData,
  fieldPermission,
  isTrue
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MainCard title={formTitle}>
        <Grid container spacing={3.5} component={'form'} onSubmit={handleSubmit(formSubmit)} id={formId}>
          {/* InputFiled component */}
          {/* <InputFiled commonInputTypes={commonInputTypes} formData={formData} column={column} control={control} theme={theme} /> */}
          {children}
          {fieldPermission && <EditPermissionInput control={control} updateFormFieldData={updateFormFieldData} isTrue={isTrue} />}
          <Grid item xs={12}>
            <Divider />
          </Grid>
          {/* <Grid item xs={12}>
            <EditPermissionInput control={control} />
          </Grid> */}
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2}>
              <Button disabled={isLoading} variant="outlined" color="secondary" type="reset" onClick={reset}>
                Reset
              </Button>
              <LoadingButton
                loading={isLoading}
                disabled={formState.isSubmitting || isLoading}
                variant="contained"
                loadingPosition="end"
                endIcon={<SaveFilled />}
                type="submit"
              >
                {isUpdate ? 'Update' : 'Submit'}
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
        <Typography color="error" variant="body1" component="div">
          Required filed is market as *
        </Typography>
      </MainCard>
    </LocalizationProvider>
  );
}

PermissionFormPage.propTypes = {
  formTitle: PropTypes.string,
  formId: PropTypes.string,
  formData: PropTypes.array,
  column: PropTypes.object,
  validationSchema: PropTypes.object,
  defaultValuesProp: PropTypes.object,
  formSubmit: PropTypes.func,
  isUpdate: PropTypes.bool,
  isLoading: PropTypes.bool,
  user: PropTypes.object,
  defaultValues: PropTypes.object,
  control: PropTypes.object,
  handleSubmit: PropTypes.func,
  reset: PropTypes.func,
  formState: PropTypes.object,
  setError: PropTypes.func,
  theme: PropTypes.object,
  commonInputTypes: PropTypes.array,
  children: PropTypes.node
};

export default PermissionFormPage;
