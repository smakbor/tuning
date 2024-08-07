import { Box } from '@mui/material';
import FormComponent from 'components/custom/form/FormComponent';
import React from 'react';
import PropTypes from 'prop-types';
import useFormHook from 'components/custom/hooks/useFormHook';

const ResellerTicketDialog = ({
  isUpdate,
  isLoading,
  handleCloseDialog,
  defaultData,
  handleTicketCreate,
  handleTicketUpdate,
  formData,
  validationSchema,
  formTitle,
  formId,
  formType,
  openDialog
}) => {
  //===> REACT HOOK FORM FROM CUSTOM HOOK
  const { control, formState, reset, setError, handleSubmit } = useFormHook({
    validationSchema,
    defaultValuesProp: defaultData
  });

  //---> Bulletin Create Form Submit Handler
  const formSubmit = (formValue) => {
    if (!isUpdate) {
      handleTicketCreate({ formValue, setError, reset });
    } else {
      handleTicketUpdate({ formValue, setError, reset });
    }
  };

  /**
   * -> INPUT COMPONENT PROPS
   * **/
  const INPUT_COMPONENT_PROPS = {
    formTitle,
    formId,
    formSubmit,
    formData: formData,
    isLoading,
    formType,
    openDialog,
    handleCloseDialog,
    control,
    formState,
    reset,
    setError,
    handleSubmit,
    column: {
      xs: 1,
      sm: 1,
      md: 1,
      lg: 1
    }
  };

  return (
    <Box>
      <FormComponent {...INPUT_COMPONENT_PROPS} />
    </Box>
  );
};

ResellerTicketDialog.prototype = {
  handleTicketUpdate: PropTypes.func,
  handleTicketCreate: PropTypes.func,
  isUpdate: PropTypes.bool,
  defaultData: PropTypes.object,
  isLoading: PropTypes.bool,
  handleCloseDialog: PropTypes.func,
  formType: PropTypes.string,
  openDialog: PropTypes.bool,
  formData: PropTypes.array,
  validationSchema: PropTypes.object,
  formTitle: PropTypes.string,
  formId: PropTypes.string
};

export default ResellerTicketDialog;
