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
import EmployeeForm from 'pages/staff/employee/EmployeeForm';
import { useCreateIncomeTypeMutation, useGetIncomeTypeQuery } from 'api/service/incomeType.service';
import IncomeTypeFrom from '../incomeType/IncomeTypeForm';

const IncomeFrom = ({ createIncome, updateIncome, isUpdate, defaultValues, isLoading, handleCloseDialog, openDialog, formType }) => {
  // =============|| create employee default value||===============
  //EMPLOYEE DEFAULT VALUE
  let EMPLOYEE_DEFAULT_VALUES = {
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
  // =============|| create employee default value||===============
  // INCOME TYPE DEFAULT VALUE
  const INCOME_DEFAULT_VALUE = { name: '', employee: '', amount: '', remarks: '', incomeType: '' };

  /**
   * -> INCOME TYPES RELATED RTK HOOKS MUTATION
   *
   **/
  const [createIncomeType, { isLoading: isCreating }] = useCreateIncomeTypeMutation();

  // ==========||user auth hook ||=============
  const { user } = useAuth();

  //   ============== || use dialog custom hook ||==============
  // employee
  const {
    open: employeeDialogOpen,
    handleDialogOpen: handleEmployeeDialogOpen,
    handleDialogClose: handleEmployeeDialogClose
  } = useDialog();

  // income type open dialog
  const {
    open: incomeTypeDialogOpen,
    handleDialogOpen: handleIncomeTypeDialogOpen,
    handleDialogClose: handleIncomeTypeDialogClose
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
  // @GET INCOME TYPE OBJECT
  const { incomeType } = useGetIncomeTypeQuery(user?.merchant, {
    skip: !user?.merchant,
    selectFromResult: ({ data }) => {
      return {
        incomeType: convertToLabel(data, 'name', '_id')
      };
    }
  });

  // create employeeHandler
  const createEmployeeHandler = ({ data, setError, reset }) => {
    data.merchant = user?.merchant;
    addEmployee({ data, setError, handleCloseDialog, reset });
  };
  /**
   * -> VALIDATION SCHEMA
   * **/
  const validationSchema = yup.object({
    employee: yup.string().required('Employee is required'),
    amount: yup.number().typeError('Amount is required').required('Amount is required'),
    incomeType: yup.string().required('IncomeType is required'),
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
      updateIncome({ data, handleCloseDialog, setError });
    } else {
      createIncome({ data, handleCloseDialog, setError, reset });
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
      type: 'single-select',
      name: 'incomeType',
      label: 'Income-type',
      required: false,
      placeholder: 'Select income-type',
      size: 'large',
      visibility: true,
      disabled: false,
      id: 'income',
      options: incomeType || [],
      addNew: true,
      addNewClickHandler: () => {
        handleIncomeTypeDialogOpen();
      }
    },
    {
      type: 'number',
      name: 'amount',
      label: 'Amount',
      placeholder: 'Enter Amount',
      required: true,
      size: 'large',
      visibility: true,
      disabled: false,
      id: 'amount'
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
          formTitle: isUpdate ? 'Update income' : 'Create income',
          formId: 'income',
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
          column: { xs: 1, sm: 1, md: 1, lg: 2 }
        }}
      />

      {/* employee dialog form   */}
      <EmployeeForm
        {...{
          createEmployeeHandler,
          handleCloseDialog: handleEmployeeDialogClose,
          defaultValues: EMPLOYEE_DEFAULT_VALUES,
          isLoading: addEmployeeLoading,
          formType: 'dialog',
          dialogSize: 'lg',
          openDialog: employeeDialogOpen
        }}
      />
      {/* incomeType dialog form */}
      <IncomeTypeFrom
        {...{
          createIncomeType,
          handleCloseDialog: handleIncomeTypeDialogClose,
          defaultValues: INCOME_DEFAULT_VALUE,
          isLoading: isCreating,
          user,
          formType: 'dialog',
          dialogSize: 'sm',
          openDialog: incomeTypeDialogOpen
        }}
      />
    </Box>
  );
};

IncomeFrom.propTypes = {
  updateIncome: PropTypes.func,
  createIncome: PropTypes.func,
  isUpdate: PropTypes.bool,
  defaultValues: PropTypes.object,
  isLoading: PropTypes.bool,
  handleCloseDialog: PropTypes.func,
  user: PropTypes.object,
  brandId: PropTypes.string,
  openDialog: PropTypes.bool,
  formType: PropTypes.string
};

export default IncomeFrom;
