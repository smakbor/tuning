/* eslint-disable react-hooks/exhaustive-deps */
import FormComponent from 'components/custom/form/FormComponent';
import React from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import useFormHook from 'components/custom/hooks/useFormHook';
import { Box } from '@mui/system';
import { useAddEmployeeMutation, useGetEmployeeQuery } from 'api/service/employee.service';
import useAuth from 'hooks/useAuth';
import useDialog from 'components/custom/hooks/useDialog';
import { convertToLabel } from 'utils/form-label-converter';

const IncomeTypeFrom = ({
  createIncomeType,
  updateIncomeType,
  isUpdate,
  defaultValues,
  isLoading,
  handleCloseDialog,
  openDialog,
  formType
}) => {
  // =============|| create employee default value||===============
  // DEFAULT VALUE
  let DEFAULT_VALUES = {
    name: '',
    mobile: '',
    gender: '',
    nid: '',
    division: '',
    district: '',
    thana: '',
    address: '',
    reference: {
      name: '',
      mobile: '',
      address: ''
    },
    salary: '',
    salaryType: '',
    due: '',
    status: 'ACTIVE',
    fatherName: '',
    password: ''
  };

  // ==========||user auth hook ||=============
  const { user } = useAuth();

  //   ============== || use dialog custom hook ||==============
  const {
    open: employeeDialogOpen,
    handleDialogOpen: handleEmployeeDialogOpen,
    handleDialogClose: handleEmployeeDialogClose
  } = useDialog();

  // >=============||RTK MUTATION EMPLOYEE HOOK||================
  const [addEmployee, { isLoading: addEmployeeLoading }] = useAddEmployeeMutation();

  // @GET EMPLOYEE OBJECT
  const { employeeOptions } = useGetEmployeeQuery(user?.merchant, {
    skip: !user?.merchant,
    selectFromResult: ({ data }) => {
      return {
        employeeOptions: convertToLabel(data, 'name', '_id')
      };
    }
  });

  // create employeeHandler
  const createEmployeeHandler = ({ data, setError, reset }) => {
    data.merchant = user?.merchant;
    addEmployee({ data, setError, handleCloseDialog: handleEmployeeDialogClose, reset });
  };
  /**
   * -> VALIDATION SCHEMA
   * **/
  const validationSchema = yup.object({
    employee: yup.string().required('Employee is required'),
    name: yup.string().required('Name Type is required'),
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
    data.merchant = user?.merchant;
    if (isUpdate) {
      updateIncomeType({ data, handleCloseDialog, setError });
    } else {
      createIncomeType({ data, handleCloseDialog, setError, reset });
    }
  };

  /**
   * -> FORM DATA FOR INPUT
   * **/
  const formData = [
    {
      type: 'text',
      name: 'name',
      label: 'Name',
      placeholder: 'Enter Name',
      required: true,
      size: 'large',
      visibility: true,
      disabled: false,
      id: 'name'
    },
    {
      type: 'single-select',
      name: 'employee',
      label: 'Employee',
      required: false,
      placeholder: 'Select employee',
      size: 'large',
      visibility: true,
      disabled: false,
      id: 'employee',
      options: employeeOptions || [],
      addNew: true,
      addNewClickHandler: () => {
        handleEmployeeDialogOpen();
      }
    },
    {
      type: 'textarea',
      name: 'remarks',
      label: 'Remarks',
      placeholder: 'Enter Remarks',
      required: false,
      size: 'large',
      visibility: true,
      disabled: false,
      id: 'remarks',
      column: { xs: 1, sm: 1, md: 1, lg: 1 }
    }
  ];

  return (
    <Box>
      <FormComponent
        {...{
          formTitle: isUpdate ? 'Update incomeType' : 'Create incomeType',
          formId: 'incomeType',
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

IncomeTypeFrom.propTypes = {
  createIncomeType: PropTypes.func,
  updateIncomeType: PropTypes.func,
  isUpdate: PropTypes.bool,
  defaultValues: PropTypes.object,
  isLoading: PropTypes.bool,
  handleCloseDialog: PropTypes.func,
  user: PropTypes.object,
  brandId: PropTypes.string,
  openDialog: PropTypes.bool,
  formType: PropTypes.string
};

export default IncomeTypeFrom;
