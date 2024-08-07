import { Box } from '@mui/material';
import React, { useState } from 'react';
import Table from 'components/custom/table/Table';
import useAuth from 'hooks/useAuth';
import useDialog from 'components/custom/hooks/useDialog';
import {
  useCreateTypeMutation,
  useGetTypesQuery,
  useDeleteOrRestoreSupportTypeMutation,
  useUpdateSupportTypeMutation
} from 'api/service/support.service';
import dayjs from 'dayjs';
import TypeDialog from './TypeDialog';
import * as yup from 'yup';
import { DeleteFilled } from '@ant-design/icons';
import ActionCell from 'components/custom/table/ActionCell';
import DeletionAlert from 'components/custom/alert/DeleteAlert';

const Type = () => {
  //===> USER FROM AUTH CONTEXT
  const { user } = useAuth();

  //===> DIALOG HANDLERS FROM DIALOG HOOK
  const {
    open,
    title,
    handleDialogOpen: handleTypeCreateDialog,
    handleDialogOpen: handleTypeUpdateDialog,
    handleDialogClose,
    deleteOpen,
    handleDeleteDialogOpen,
    handleDeleteDialogClose
  } = useDialog();

  //========================||QUIRY HOOKS||========================//

  //===> @GET SUPPPORT TICKET TYPES
  const { data: types, isLoading: typeLoading } = useGetTypesQuery(user?.merchant, {
    skip: !user
  });

  //========================||MUTATION HOOKS||========================//

  //===> @CREATE SUPPORT TICKET TYPE
  const [createType, { isLoading: typeCreateLoading }] = useCreateTypeMutation();
  // UPDATE TYPE
  const [updateSupportType, { isLoading: supportTypeUpdateLoading }] = useUpdateSupportTypeMutation();

  //DELETE SUPPORT TYPE
  const [deleteSupportType] = useDeleteOrRestoreSupportTypeMutation();

  //========================||DEFAULT VALUE||========================//
  const DEFAULT_VALUE = {
    name: '',
    remarks: ''
  };

  //========================||LOCAL STATES||========================//

  //---> Default Data For Dialog
  const [defaultData, setDefaultData] = useState(DEFAULT_VALUE);

  //---> Is Update
  const [isUpdate, setIsUpdate] = useState(false);

  //---> Type Data
  const [typeData, setTypeData] = useState({});
  const [supportTypeIdForDelete, setSupportTypeIdForDelete] = useState();
  //========================||FUNCTION HANDLERS||========================//

  //---> Dialog Close
  const handleCloseDialog = () => {
    handleDialogClose();
  };

  //---> Support Ticket Type Create Dialog
  const handleAddButton = () => {
    setDefaultData(DEFAULT_VALUE);
    setIsUpdate(false);
    handleTypeCreateDialog();
  };

  //---> Ticket Type Create
  const handleTypeCreate = ({ formValue, setError, reset }) => {
    const data = {
      ...formValue,
      merchant: user?.merchant
    };

    //---> Type create data
    createType({ data, handleCloseDialog, setError, reset });
  };

  // -> HANDLE DELETE SupportType DIALOG OPEN
  const handleDeleteSupportTypeDialogOpen = (deleteData) => {
    setSupportTypeIdForDelete(deleteData._id);
    handleDeleteDialogOpen();
  };

  //handle update
  const handleSupportTypeUpdate = ({ formValue, setError, reset }) => {
    const data = {
      ...formValue,
      merchant: user?.merchant
    };

    //---> Category update data
    updateSupportType({ data, handleCloseDialog, setError, reset });
  };

  const updateSupportTypeDialogHandler = (data) => {
    handleTypeUpdateDialog();
    setDefaultData({
      _id: data._id,
      name: data.name,
      remarks: data.remarks
    });
    setIsUpdate(true);
  };

  // -> HANDLE DELETE SupportType SUBMIT
  const handleDeleteSupportTypeSubmit = () => {
    deleteSupportType({
      handleDeleteSuccess: () => {
        setSupportTypeIdForDelete('');
        handleDeleteDialogClose();
      },
      supportTypeId: supportTypeIdForDelete,
      merchant: user?.merchant,
      isTrash: true
    });
  };

  //=======================||TABLE COLUMNS||========================//

  //---> MAIN TABLE
  const columns = [
    {
      Header: 'Name',
      Footer: 'Name',
      accessor: 'name',
      dataType: 'text',
      filter: 'fuzzyText',
      disableFilters: true,
      disableGroupBy: true
    },
    {
      Header: 'Remarks',
      Footer: 'Remarks',
      accessor: 'remarks',
      dataType: 'text',
      filter: 'fuzzyText',
      disableFilters: true,
      disableGroupBy: true
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
    },
    {
      id: 'action',
      Footer: 'Actions',
      disableSortBy: true,
      disableFilters: true,
      disableGroupBy: true,
      Aggregated: () => null,
      Header: 'Actions',
      className: 'cell-center',
      // eslint-disable-next-line react/prop-types
      Cell: ({ row }) => {
        return (
          <>
            <ActionCell
              ellipsis={user?.role === 'MERCHANT'}
              row={row}
              isExpandable={false}
              setOpen={updateSupportTypeDialogHandler}
              permissionKey="SupportEmployeePermissions"
              menuItems={[
                {
                  title: 'Delete',
                  icon: <DeleteFilled />,
                  handleClick: handleDeleteSupportTypeDialogOpen
                }
              ]}
            />
          </>
        );
      }
    }
  ];

  //=======================||FORM VALIDATION SCHEMA||========================//

  //---> Support Ticket Type Create
  const CreateTypeValidationSchema = yup.object({
    name: yup.string().required('name is required field'),
    remarks: yup.string()
  });

  //=======================||FORM DATA||========================//

  //---> Support Ticket Type Create
  const CreateTypeFormData = [
    {
      type: 'text',
      name: 'name',
      label: 'Name',
      placeholder: 'Name',
      required: true,
      size: 'large',
      visibility: true,
      disabled: false,
      id: 'pppoeProfile'
    },
    {
      type: 'textarea',
      name: 'remarks',
      label: 'Remarks',
      placeholder: 'Remarks',
      required: false,
      size: 'large',
      visibility: true,
      disabled: false,
      id: 'pppoeProfile'
    }
  ];

  return (
    <Box>
      <Table
        {...{
          title: 'Support Type',
          subheader: 'List of Type',
          hasAction: true,
          columns: columns,
          data: types,
          hasSelection: false,
          addButtonLabel: true,
          handleAddButton,
          openDialog: open,
          handleCloseDialog,
          isLoading: typeLoading,
          hasSerial: true,
          isServerPagination: false,
          isServerFilter: false,
          isExpandable: true,
          rowHiddenName: 'tickets'
        }}
      />

      {/* TICKET TYPE CREATE AND UPDATE DIALOG */}
      <TypeDialog
        {...{
          isUpdate,
          defaultData,
          handleCloseDialog,
          handleTypeCreate,
          handleSupportTypeUpdate,
          isLoading: typeCreateLoading,
          formData: CreateTypeFormData,
          validationSchema: CreateTypeValidationSchema,
          openDialog: open,
          formTitle: isUpdate ? 'Update Type' : 'Create Type',
          formId: 'supportTcketType',
          formType: 'dialog'
        }}
      />
      <DeletionAlert
        title={title}
        open={deleteOpen}
        handleSubmission={handleDeleteSupportTypeSubmit}
        isLoading={false}
        handleClose={handleDeleteDialogClose}
      />
    </Box>
  );
};

export default Type;
