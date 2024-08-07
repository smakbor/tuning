import { enqueueSnackbar } from 'notistack';

// -> PASSWORD COPY FUNCTION
/**
 * @constructor
 * @param {string} copyText - Copy text to clipboard value
 * @param {string} toastMessageFieldName - Toast message field/module name
 * @example
 *  onClick={() => handleClickToCopyClipBoard('password', 'Password')}
 * @description - Click copy text to clipboard
 * **/
const handleClickToCopyClipBoard = async (copyText, toastMessageFieldName) => {
  try {
    await navigator.clipboard.writeText(copyText);
    enqueueSnackbar(`${toastMessageFieldName} copied to clipboard`, {
      variant: 'success',
      autoHideDuration: 1000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center'
      }
    });
  } catch (error) {
    enqueueSnackbar(`${toastMessageFieldName} Copy to clipboard failed`, {
      variant: 'error',
      autoHideDuration: 1500,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center'
      }
    });
    console.error(`${toastMessageFieldName} Copy to clipboard failed: `, error);
  }
};
export default handleClickToCopyClipBoard;
