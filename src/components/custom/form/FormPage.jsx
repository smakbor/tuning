/* eslint-disable react-hooks/exhaustive-deps */

import { Button, Divider, Grid, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';

// assets
import MainCard from 'components/MainCard';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { SaveFilled } from '@ant-design/icons';
import LoadingButton from 'components/@extended/LoadingButton';
import InputFiled from './Inputs';

//================|| FORMS VALIDATION - ADDRESS================//
function FormPage({
  formTitle,
  formId,
  formData,
  column,
  formSubmit,
  isUpdate,
  isLoading,
  control,
  handleSubmit,
  reset,
  formState,
  commonInputTypes,
  theme,
  children,
  handleManageProduct,
  handleRemoveProductItem,
  handleRemoveAllProduct
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MainCard title={formTitle}>
        <Grid container spacing={3.5} component={'form'} onSubmit={handleSubmit(formSubmit)} id={formId}>
          {/* InputFiled component */}
          <InputFiled
            commonInputTypes={commonInputTypes}
            formData={formData}
            column={column}
            control={control}
            theme={theme}
            handleManageProduct={handleManageProduct}
            handleRemoveAllProduct={handleRemoveAllProduct}
          />
          {children}
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
                disabled={isLoading}
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

FormPage.propTypes = {
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

export default FormPage;
