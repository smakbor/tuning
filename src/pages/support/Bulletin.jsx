import React, { useState } from 'react';
import * as yup from 'yup';

// mui
import { Box } from '@mui/material';

// hooks
import useAuth from 'hooks/useAuth';

// custom component
import Table from 'components/custom/table/Table';
import { sk } from 'date-fns/locale';
import { useCreateBulletinMutation, useGetBulletinsQuery } from 'api/service/support.service';
import useDialog from 'components/custom/hooks/useDialog';
import BulletinDialog from './BulletinDialog';
import dayjs from 'dayjs';

const Bulletin = () => {
  //===> USER FROM AUTH CONTEXT
  const { user } = useAuth();

  //===> DIALOG HANDLERS FROM DIALOG HOOK
  const {
    open,
    title,
    handleDialogOpen: handleBulletinCreateDialog,
    handleDialogOpen: handleBulletinUpdateDialog,
    handleDialogClose,
    deleteOpen,
    handleDeleteDialogOpen,
    handleDeleteDialogClose
  } = useDialog();

  //========================||QUIRY HOOKS||========================//

  //===> @GET BULLETIN
  const { data: bulletins, isLoading: bulletinLoading } = useGetBulletinsQuery();

  //========================||MUTATION HOOKS||========================//

  //===> @CREATE BULLETIN
  const [createBulletin, { isLoading: bulletinCreateLoading }] = useCreateBulletinMutation();

  //========================||DEFAULT VALUE||========================//
  const DEFAULT_VALUE = {
    title: '',
    startDate: '',
    endDate: ''
  };

  //========================||LOCAL STATES||========================//

  //---> Default Data For Dialog
  const [defaultData, setDefaultData] = useState(DEFAULT_VALUE);

  //---> Is Update
  const [isUpdate, setIsUpdate] = useState(false);

  //========================||FUNCTION HANDLERS||========================//

  //---> Dialog Close
  const handleCloseDialog = () => {
    handleDialogClose();
  };

  //---> User Bulletin Create Dialog
  const handleAddButton = () => {
    setDefaultData(DEFAULT_VALUE);
    setIsUpdate(false);
    handleBulletinCreateDialog();
  };

  //---> User Bulletin Create
  const handleBulletinCreate = ({ formValue, setError, reset }) => {
    const data = {
      ...formValue,
      merchant: user?.merchant
    };

    //---> Bulletin create data
    createBulletin({ data, handleCloseDialog, setError, reset });
  };

  //---> Bulletin Update Data
  const handleBulletinUpdate = ({ formValue, setError, reset }) => {};

  //=======================||TABLE COLUMNS||========================//

  //---> MAIN TABLE
  const columns = [
    {
      Header: 'Title',
      Footer: 'Title',
      accessor: 'title',
      dataType: 'text',
      filter: 'fuzzyText',
      disableFilters: true,
      disableGroupBy: true
    },
    {
      Header: 'Start Date',
      Footer: 'Start Date',
      accessor: 'startDate',
      dataType: 'text',
      filter: 'fuzzyText',
      disableFilters: true,
      disableGroupBy: true,
      Cell: ({ row }) => {
        const date = row.original?.createdAt;
        return date && dayjs(date).format('lll');
      }
    },
    {
      Header: 'End Date',
      Footer: 'End Date',
      accessor: 'endDate',
      dataType: 'text',
      filter: 'fuzzyText',
      disableFilters: true,
      disableGroupBy: true,
      Cell: ({ row }) => {
        const date = row.original?.createdAt;
        return date && dayjs(date).format('lll');
      }
    },
    {
      Header: 'CreateAt',
      Footer: 'CreateAt',
      accessor: 'createdAt',
      dataType: 'text',
      filter: 'fuzzyText',
      disableFilters: true,
      disableGroupBy: true,
      Cell: ({ row }) => {
        const date = row.original?.createdAt;
        return date && dayjs(date).format('lll');
      }
    }
  ];

  //=======================||FORM VALIDATION SCHEMA||========================//

  //---> User Bulletin Create
  const CreateBulletinValidationSchema = yup.object({
    title: yup.string().required().typeError('Title is required field'),
    startDate: yup.string().required(),
    endDate: yup.string().required()
  });

  //=======================||FORM DATA||========================//

  //---> User Bulletin Create
  const CreateBulletinFormData = [
    {
      type: 'textarea',
      name: 'title',
      label: 'Title',
      placeholder: 'Title',
      required: true,
      size: 'large',
      visibility: true,
      disabled: false,
      id: 'pppoeProfile'
    },
    {
      type: 'date-picker',
      name: 'startDate',
      label: 'Start Date',
      placeholder: 'Start Date',
      required: true,
      size: 'large',
      visibility: true,
      disabled: false,
      id: 'startDate'
    },
    {
      type: 'date-picker',
      name: 'endDate',
      label: 'End Date',
      placeholder: 'End Date',
      required: true,
      size: 'large',
      visibility: true,
      disabled: false,
      id: 'endDate'
    }
  ];

  return (
    <Box>
      <Table
        {...{
          title: 'Bulletin',
          subheader: 'List of Bulletin',
          hasAction: true,
          columns: columns,
          data: bulletins,
          hasSelection: false,
          addButtonLabel: true,
          handleAddButton,
          openDialog: open,
          handleCloseDialog,
          isLoading: bulletinLoading,
          hasSerial: true,
          isServerPagination: false,
          isServerFilter: false,
          isExpandable: true,
          rowHiddenName: 'bulletins'
        }}
      />

      {/* BULLETIN CREATE AND UPDATE DIALOG */}
      <BulletinDialog
        {...{
          isUpdate,
          defaultData,
          handleCloseDialog,
          handleBulletinCreate,
          handleBulletinUpdate,
          isLoading: bulletinCreateLoading,
          formData: CreateBulletinFormData,
          validationSchema: CreateBulletinValidationSchema,
          openDialog: open,
          formTitle: isUpdate ? 'Update Bulletin' : 'Create Bulletin',
          formId: 'userBulletin',
          formType: 'dialog'
        }}
      />
    </Box>
  );
};

export default Bulletin;
