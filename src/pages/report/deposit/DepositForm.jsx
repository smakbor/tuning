import PropTypes from 'prop-types';
import { useCreateDepositMutation } from 'api/service/deposit.service';
import { useGetEmployeeQuery } from 'api/service/employee.service';
import FormComponent from 'components/custom/form/FormComponent';
import useFormHook from 'components/custom/hooks/useFormHook';
import React from 'react';
import { convertToObject } from 'utils/convert-to-object';
import { convertToLabel } from 'utils/form-label-converter';
import * as yup from 'yup';

// Default value
const DEFAULT_VALUE = {
  employee: '',
  amount: '',
  remarks: ''
};

const DepositForm = ({ defaultValues, handleCloseDialog, user, openDialog, formType }) => {
  /**
   * -> VALIDATION SCHEMA
   * **/
  const validationSchema = yup.object({
    employee: yup.string().required('Employee is required'),
    amount: yup.number().required('Amount is required').typeError('Amount must be a number or Required'),
    remarks: yup.string()
  });

  // -> CREATE DEPOSIT DATA TYPE LIST
  const [createDeposit, { isLoading: createDepositLoading }] = useCreateDepositMutation();

  // -> GET EMPLOYEE LIST
  const { employeeList, employeeObject } = useGetEmployeeQuery(user?.merchant, {
    skip: !user?._id,
    selectFromResult: ({ data, ...rest }) => {
      return {
        employeeList: convertToLabel(data, 'name', '_id'),
        employeeObject: convertToObject(data, '_id', ['name']),
        ...rest
      };
    }
  });

  /***
   * -> REACT HOOK FORM FROM CUSTOM HOOK
   * **/
  const { control, formState, reset, setError, handleSubmit } = useFormHook({
    validationSchema,
    defaultValuesProp: DEFAULT_VALUE
  });

  /**
   * -> FORM DATA FOR INPUT
   * **/
  const formData = [
    {
      type: 'single-select',
      name: 'employee',
      label: 'Select Employee',
      placeholder: 'Select Employee',
      required: true,
      size: 'large',
      visibility: true,
      disabled: false,
      id: 'employee',
      options: employeeList || []
    },
    {
      type: 'number',
      name: 'amount',
      label: 'Deposit Amount',
      placeholder: 'Deposit Amount',
      visibility: true,
      size: 'large',
      required: true,
      disable: false,
      id: 'amount'
    },
    {
      type: 'textarea',
      name: 'remarks',
      label: 'Remarks',
      placeholder: 'Enter Remarks',
      visibility: true,
      size: 'large',
      required: false,
      disable: false,
      id: 'Remarks'
    }
  ];

  /**
   * -> SUBMIT FORM
   * **/
  const formSubmit = (data) => {
    // set depositTo and depositBy
    data.depositTo = user._id;
    data.depositBy = employeeObject?.[data.employee].name;

    // post deposit data to api
    createDeposit({ data, setError, reset, merchant: user?.merchant, handleCloseDialog });
  };

  return (
    <FormComponent
      {...{
        formTitle: 'Create Deposit',
        formId: 'deposit-form',
        formSubmit,
        defaultValuesProp: defaultValues,
        formData,
        validationSchema,
        isUpdate: false,
        isLoading: createDepositLoading,
        handleCloseDialog,
        control,
        openDialog,
        formType,
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
      }}
    />
  );
};

// validate propType
DepositForm.propTypes = {
  defaultValues: PropTypes.object,
  handleCloseDialog: PropTypes.func,
  openDialog: PropTypes.bool,
  formType: PropTypes.string,
  user: PropTypes.object
};

export default DepositForm;
