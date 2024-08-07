/* eslint-disable react-hooks/exhaustive-deps */
import FormComponent from 'components/custom/form/FormComponent';
import React from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import useFormHook from 'components/custom/hooks/useFormHook';
import { Box } from '@mui/system';
import { useGetEmployeeQuery } from 'api/service/employee.service';
import { convertToLabel } from 'utils/form-label-converter';

const SupportEmployeeForm = ({
  updateSupportEmployee,
  createSupportEmployee,
  isUpdate,
  defaultValues,
  isLoading,
  handleCloseDialog,
  user,
  openDialog,
  formType,
  employeeLabelValue
}) => {
  /**
   * -> VALIDATION SCHEMA
   * **/

  const validationSchema = yup.object({
    employee: yup.string().required('Employee  is required'),
    startTime: yup.string().required('Start Time is required'),
    endTime: yup.string().required('End Time is required'),
    remarks: yup.string()
  });

  /**
   * -> REACT HOOK FORM FROM CUSTOM HOOK
   * */
  const { control, formState, reset, setError, handleSubmit } = useFormHook({ validationSchema, defaultValuesProp: defaultValues });

  /**
   * -> FORM SUBMIT HANDLER
   * **/
  const formSubmit = (data) => {
    if (isUpdate) {
      updateSupportEmployee({ data, handleCloseDialog, setError, reset, merchant: user?.merchant });
    } else {
      data.merchant = user?.merchant;
      createSupportEmployee({ data, handleCloseDialog, setError, reset });
    }
  };

  /**
   * -> FORM DATA FOR INPUT
   * **/
  const formData = [
    {
      type: 'single-select',
      name: 'employee',
      label: 'Employee',
      placeholder: 'Employee Name',
      required: true,
      size: 'large',
      visibility: true,
      disabled: false,
      id: 'name',
      options: employeeLabelValue || []
    },
    {
      type: 'text',
      name: 'startTime',
      label: 'Start Time',
      placeholder: 'Enter Start Time',
      required: true,
      size: 'large',
      visibility: true,
      disabled: false,
      id: 'startTime'
    },
    {
      type: 'text',
      name: 'endTime',
      label: 'End Time',
      placeholder: 'Enter End Time',
      required: true,
      size: 'large',
      visibility: true,
      disabled: false,
      id: 'endTime'
    },
    {
      type: 'textarea',
      name: 'remarks',
      label: 'Remarks',
      placeholder: 'Brand Remarks',
      required: false,
      size: 'large',
      visibility: true,
      disabled: false,
      id: 'remarks'
    }
  ];

  return (
    <Box>
      <FormComponent
        {...{
          formTitle: isUpdate ? 'Update Support Employee' : 'Create Support Employee',
          formId: 'support-employee-form',
          formSubmit,
          defaultValuesProp: defaultValues,
          formData,
          validationSchema,
          isUpdate,
          isLoading,
          openDialog,
          formType,
          handleCloseDialog,
          control,
          formState,
          reset,
          setError,
          handleSubmit,
          column: { xs: 1, sm: 1, md: 1, lg: 1 }
        }}
      />
    </Box>
  );
};

SupportEmployeeForm.propTypes = {
  updateSupportEmployee: PropTypes.func,
  createSupportEmployee: PropTypes.func,
  isUpdate: PropTypes.bool,
  defaultValues: PropTypes.object,
  employeeLabelValue: PropTypes.object,
  isLoading: PropTypes.bool,
  handleCloseDialog: PropTypes.func,
  user: PropTypes.object,
  openDialog: PropTypes.bool,
  formType: PropTypes.string
};

export default SupportEmployeeForm;
