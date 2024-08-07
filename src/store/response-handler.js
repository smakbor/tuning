import { isFulfilled, isRejectedWithValue } from '@reduxjs/toolkit';
// third-party
import { enqueueSnackbar } from 'notistack';

export const successAndErrorHandler = () => (next) => (action) => {
  const requestMethod = action.meta?.baseQueryMeta?.request?.method;

  // -> IF RESPONSE IS UNAUTHORIZE CLEAR LOCALSOTRAGE ROOT-BILLING-TOKEN AND REDIRECT TO LOGIN PAGE
  if (isRejectedWithValue(action)) {
    let errorMessage = action.payload?.data;

    if (errorMessage?.statusCode === 401 && !window.location.href.includes('/auth/login')) {
      enqueueSnackbar(errorMessage, {
        variant: 'error',
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center'
        }
      });

      // CLEAR LOCAL_STORAGE ROOT-BILLING-TOKEN
      localStorage.removeItem('root-billing-token');

      // NAVIGATE TO LOGIN PAGE
      window.location = '/auth/login';
    }
  }

  if (isRejectedWithValue(action) && requestMethod !== 'GET') {
    let errorMessage = action.payload?.data;
    if (typeof errorMessage?.message === 'string') {
      errorMessage = errorMessage?.message;
    } else if (typeof errorMessage === 'object') {
      errorMessage = errorMessage?.message;
    }

    enqueueSnackbar(` ${action.payload?.data?.error ? `${action.payload?.data?.error} :` : ''} ${errorMessage} `, {
      variant: 'error',
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center'
      }
    });
  }

  if (isFulfilled(action) && requestMethod !== 'GET') {
    const isString = typeof action.payload?.message === 'string';
    if (isString) {
      enqueueSnackbar(action.payload.message, {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center'
        }
      });
    }
  }
  return next(action);
};
