import React from 'react';
import FormPage from './FormPage';
import FormDialog from './FormDialog';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material';

const FormComponent = ({ formType, ...formProps }) => {
  const theme = useTheme();

  //common input types
  const commonInputTypes = ['text', 'email', 'number', 'textarea'];

  if (formType === 'dialog') {
    /**
      NOTE:extra props needed
      
      handleCloseDialog,
      openDialog,
      dialogSize
     */
    return <FormDialog {...formProps} theme={theme} commonInputTypes={commonInputTypes} />;
  }

  return <FormPage {...formProps} theme={theme} commonInputTypes={commonInputTypes} />;
};

FormComponent.propTypes = {
  formType: PropTypes.string,
  formProps: PropTypes.object
};

export default FormComponent;
