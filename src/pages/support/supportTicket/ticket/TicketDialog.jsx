import { Box } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import useFormHook from 'components/custom/hooks/useFormHook';
import FormComponent from 'components/custom/form/FormComponent';
import * as yup from 'yup';
import useAuth from 'hooks/useAuth';
import { useTicketAssignMutation } from 'api/service/support.service';

const TicketDialog = ({ handleCloseDialog, defaultData, formTitle, formId, formType, ticketData, openDialog, employeesData }) => {
  // USE AUTH
  const { user } = useAuth();

  // ==============|| RTK HOOKS ||====================

  // ================|| TICKET ASSIGN MUTATION ||===================
  const [ticketAssign, { isLoading: ticketAssignIsLoading }] = useTicketAssignMutation();

  //=======================||FORM VALIDATION SCHEMA||========================//
  //---> User Ticket Create
  const createTicketValidationSchema = yup.object({
    status: yup.string().required('Status is required field'),
    employee: yup.string().required('Employee required field')
  });

  //=======================||FORM DATA||========================//

  //---> User Ticket Create
  const createTicketFormData = [
    {
      type: 'single-select',
      name: 'employee',
      label: 'Employee',
      placeholder: 'Enter Employee ',
      required: true,
      size: 'large',
      visibility: true,
      disabled: false,
      id: 'employee',
      options: employeesData || []
    },
    {
      type: 'single-select',
      name: 'status',
      label: 'Status',
      placeholder: 'Title',
      required: true,
      size: 'large',
      visibility: true,
      disabled: false,
      id: 'status',
      options: [
        {
          label: 'PENDING',
          value: 'PENDING'
        },
        {
          label: 'ONHOLD',
          value: 'ONHOLD'
        },
        {
          label: 'DEVELOPMENT',
          value: 'DEVELOPMENT'
        },
        {
          label: 'RESOLVE',
          value: 'RESOLVE'
        },
        {
          label: 'PROCESSING',
          value: 'PROCESSING'
        }
      ]
    }
  ];

  //===> REACT HOOK FORM FROM CUSTOM HOOK
  const { control, formState, reset, setError, handleSubmit } = useFormHook({
    validationSchema: createTicketValidationSchema,
    defaultValuesProp: defaultData
  });

  //---> Bulletin Create Form Submit Handler
  const formSubmit = (formValue) => {
    ticketAssign({
      data: { ...ticketData, ...formValue },
      merchant: user?.merchant,
      handleCloseDialog,
      ticketId: ticketData?._id,
      setError,
      reset
    });
  };

  return (
    <Box>
      <FormComponent
        {...{
          formTitle,
          formId,
          formSubmit,
          formData: createTicketFormData,
          isLoading: ticketAssignIsLoading,
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
        }}
      />
    </Box>
  );
};

TicketDialog.propTypes = {
  defaultData: PropTypes.object,
  handleCloseDialog: PropTypes.func,
  formType: PropTypes.string,
  openDialog: PropTypes.bool,
  ticketData: PropTypes.object,
  employeesData: PropTypes.object,
  formTitle: PropTypes.string,
  formId: PropTypes.string
};

export default TicketDialog;
