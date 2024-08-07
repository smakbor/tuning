import { enqueueSnackbar } from 'notistack';

export const snackbar = (message, variant) => {
  enqueueSnackbar(message, {
    variant,
    autoHideDuration: 2000,
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'center'
    }
  });
};
