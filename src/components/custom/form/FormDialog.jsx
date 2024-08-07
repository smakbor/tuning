import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Stack } from '@mui/material';
import React from 'react';
import LoadingButton from 'components/@extended/LoadingButton';
import { SaveFilled } from '@ant-design/icons';
import InputFiled from './Inputs';
import PropTypes from 'prop-types';
import { PopupTransition } from 'components/@extended/Transitions';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Close } from '@mui/icons-material';

// create a js docs
/**
 * @description
 * A custom form dialog component
 * @param {string} formTitle - The title of the form dialog
 * @param {string} formId - The id of the form dialog
 * @param {object} formData - The form data
 * @param {number} column - The number of column
 * @param {function} formSubmit - The form submit function
 * @param {boolean} isUpdate - The form update status
 * @param {boolean} isLoading - The form loading status
 * @param {object} control - The form control
 * @param {function} handleSubmit - The form submit handler
 * @param {function} reset - The form reset handler
 * @param {object} commonInputTypes - The common input types
 * @param {object} theme - The theme object
 * @param {string} dialogSize - The dialog size
 * @param {function} handleCloseDialog - The close dialog handler
 * @param {boolean} openDialog - The dialog open status
 * @param {string} dialogContent - The dialog content
 * @param {node} children - The children component
 * @param {node} additionalHeaderContent - The additional header content
 * @returns
 */

function FormDialog({
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
  commonInputTypes,
  theme,
  dialogSize,
  handleCloseDialog,
  openDialog,
  dialogContent,
  children,
  additionalHeaderContent,
  additionalActionButtons,
  infoTable
}) {
  return (
    <Dialog
      component="form"
      maxWidth={dialogSize || 'sm'}
      onSubmit={handleSubmit(formSubmit)}
      id={formId}
      TransitionComponent={PopupTransition}
      keepMounted
      fullWidth
      onClose={handleCloseDialog}
      open={openDialog}
      sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
      aria-describedby="alert-dialog-slide-description"
    >
      {/* =================== DIALOG HEADER =================== */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {/* DIALOG TITLE */}
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {formTitle}
        </DialogTitle>

        {/* DIALOG HEADER ADDITIONAL CONTENT */}
        {!!additionalHeaderContent && (
          <Stack direction="row" gap={1} marginRight={10}>
            {additionalHeaderContent}
          </Stack>
        )}

        {/* DIALOG HEADER CLOSE ICON */}
        <IconButton
          aria-label="close"
          onClick={handleCloseDialog}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <Close />
        </IconButton>
      </Stack>

      {/* =================== DIALOG CONTENT =================== */}
      <DialogContent>
        {/* INPUT_FILED COMPONENT */}
        {infoTable && infoTable()}
        <DialogContentText sx={{ paddingY: 1 }}>{dialogContent}</DialogContentText>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid container spacing={3.5}>
            <InputFiled commonInputTypes={commonInputTypes} formData={formData} column={column} control={control} theme={theme} />
          </Grid>

          {/* CHILDREN COMPONENT */}
          {children}
        </LocalizationProvider>
      </DialogContent>

      {/* =================== DIALOG ACTIONS =================== */}
      <DialogActions>
        <Button disabled={isLoading} variant="outlined" color="secondary" type="reset" onClick={reset}>
          Reset
        </Button>
        {!!additionalActionButtons && additionalActionButtons}
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
      </DialogActions>
    </Dialog>
  );
}

FormDialog.defaultProps = {
  formTitle: '',
  formId: '',
  formData: [],
  column: 1,
  formSubmit: () => {},
  isUpdate: false,
  isLoading: false,
  control: {},
  handleSubmit: () => {},
  reset: () => {},
  commonInputTypes: {},
  theme: {},
  dialogSize: 'sm',
  handleCloseDialog: () => {},
  openDialog: false,
  dialogContent: '',
  children: null,
  additionalHeaderContent: null
};

FormDialog.propTypes = {
  formTitle: PropTypes.string,
  formId: PropTypes.string,
  formData: PropTypes.arrayOf(PropTypes.object),
  column: PropTypes.object,
  formSubmit: PropTypes.func,
  isUpdate: PropTypes.bool,
  isLoading: PropTypes.bool,
  control: PropTypes.object,
  handleSubmit: PropTypes.func,
  reset: PropTypes.func,
  commonInputTypes: PropTypes.array,
  theme: PropTypes.object,
  dialogSize: PropTypes.string,
  handleCloseDialog: PropTypes.func,
  openDialog: PropTypes.bool,
  dialogContent: PropTypes.string,
  children: PropTypes.node,
  additionalHeaderContent: PropTypes.node,
  additionalActionButtons: PropTypes.node
};

export default FormDialog;
