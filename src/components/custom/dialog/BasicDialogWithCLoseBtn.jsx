import { Close } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Stack } from '@mui/material';
import { PopupTransition } from 'components/@extended/Transitions';
import React from 'react';
import PropTypes from 'prop-types';
import LoadingButton from 'components/@extended/LoadingButton';
import { SaveFilled } from '@ant-design/icons';

const BasicDialogWithCLoseBtn = ({
  dialogSize = 'sm',
  children,
  handleDialogClose,
  openDialog,
  dialogTitle,
  additionalHeaderContent,
  dialogContent,
  dialogActionText,
  isLoading,
  hasAction,
  handleSubmission,
  handleSubmissionBtnColor,
  simpleAction,
  submitButtonColor,
  childrenItems
}) => {
  return (
    <Dialog
      maxWidth={dialogSize}
      TransitionComponent={PopupTransition}
      keepMounted
      fullWidth
      onClose={handleDialogClose}
      open={openDialog}
      sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
    >
      {/* =================== DIALOG HEADER =================== */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {/* DIALOG TITLE */}
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {dialogTitle}
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
          onClick={handleDialogClose}
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
        <DialogContentText sx={{ paddingY: 1 }}>{dialogContent}</DialogContentText>

        {/* SIMPLE ACTIONS */}
        {simpleAction && (
          <Stack justifyContent="center" alignItems="center" mt={2}>
            {children}
          </Stack>
        )}

        {/* CHILDREN COMPONENT */}
        {!simpleAction && children}
      </DialogContent>

      {/* =================== DIALOG ACTIONS =================== */}
      <DialogActions>
        <Button variant="outlined" color="secondary" type="button" onClick={handleDialogClose}>
          Cancel
        </Button>
        {hasAction && (
          <LoadingButton
            loading={isLoading}
            disabled={isLoading}
            variant="contained"
            onClick={handleSubmission}
            loadingPosition="end"
            endIcon={<SaveFilled />}
            type="submit"
          >
            {dialogActionText || 'Submit'}
          </LoadingButton>
        )}
        {simpleAction && (
          <LoadingButton
            loading={isLoading}
            disabled={isLoading}
            variant="contained"
            color={handleSubmissionBtnColor}
            onClick={handleSubmission}
            loadingPosition="end"
          >
            {dialogActionText || 'Submit'}
          </LoadingButton>
        )}
      </DialogActions>
    </Dialog>
  );
};
BasicDialogWithCLoseBtn.defaultProps = {
  dialogSize: 'sm',
  dialogActionText: 'Submit',
  isLoading: false
};

BasicDialogWithCLoseBtn.propTypes = {
  dialogSize: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  handleDialogClose: PropTypes.func,
  handleSubmission: PropTypes.func,
  openDialog: PropTypes.bool,
  dialogTitle: PropTypes.string,
  handleSubmissionBtnColor: PropTypes.string,
  additionalHeaderContent: PropTypes.node,
  dialogContent: PropTypes.node,
  children: PropTypes.node,
  dialogActionText: PropTypes.string,
  isLoading: PropTypes.bool,
  hasAction: PropTypes.bool,
  childrenItems: PropTypes.bool,
  simpleAction: PropTypes.bool
};

export default BasicDialogWithCLoseBtn;
