import { DeleteFilled } from '@ant-design/icons';
import { Box } from '@mui/material';
import useDialog from 'components/custom/hooks/useDialog';
import ActionCell from 'components/custom/table/ActionCell';
import React, { useState } from 'react';
import Table from 'components/custom/table/Table';
import useAuth from 'hooks/useAuth';
import dayjs from 'dayjs';
import SupportEmployeeForm from './SupportEmployeeFrom';
import {
  useCreateSupportEmployeeMutation,
  useGetSupportEmployeeQuery,
  useUpdateSupportEmployeeMutation,
  useDeleteOrRestoreSupportEmployeeMutation
} from 'api/service/support.service';
import { convertToObject } from 'utils/convert-to-object';
import { useGetEmployeeQuery } from 'api/service/employee.service';
import { convertToLabel } from 'utils/form-label-converter';

const SupportEmployee = () => {
  // DEFAULT VALUE
  const DEFAULT_VALUE = { name: '', remarks: '' };

  // DIALOGUE HANDLER
  const { open, deleteOpen, handleDialogOpen, handleDialogClose, handleDeleteDialogOpen, handleDeleteDialogClose, title } = useDialog();

  // USER FROM AUTH
  const { user, permissions, activeBranch } = useAuth();

  // DATA FETCHING EMPLOYEES QUERY
  const { employeeLabelValue, employeeObject } = useGetEmployeeQuery(user?.merchant, {
    skip: !user,
    selectFromResult: ({ data, ...rest }) => {
      return { employeeLabelValue: convertToLabel(data, 'name', '_id'), employeeObject: convertToObject(data, '_id', ['name']), ...rest };
    }
  });

  // SupportEmployee RELATED RTK HOOKS QUERY
  const { data, isLoading, refetch, isFetching } = useGetSupportEmployeeQuery(user?.merchant, {
    skip: !user || !activeBranch
  });
  /**
   * -> SupportEmployee RELATED RTK HOOKS MUTATION
   **/
  const [updateSupportEmployee, { isLoading: isUpdating }] = useUpdateSupportEmployeeMutation();
  const [createSupportEmployee, { isLoading: isCreating }] = useCreateSupportEmployeeMutation();
  const [deleteSupportEmployee, { isLoading: isDeleting }] = useDeleteOrRestoreSupportEmployeeMutation();

  // LOCAL STATE
  const [defaultValues, setDefaultValue] = useState(DEFAULT_VALUE);
  const [isUpdate, setIsUpdate] = useState(false);
  const [SupportEmployeeIdForDelete, setSupportEmployeeIdForDelete] = useState('');

  // UPDATE SupportEmployee HANDLER
  const updateSupportEmployeeHandler = (data) => {
    handleDialogOpen();
    setDefaultValue(data);
    setIsUpdate(true);
  };

  // ADD SupportEmployee HANDLER
  const handleAddButton = () => {
    setDefaultValue(DEFAULT_VALUE);
    handleDialogOpen();
    setIsUpdate(false);
  };

  // SupportEmployee CLOSE HANDLER
  const handleCloseDialog = () => {
    setDefaultValue(DEFAULT_VALUE);
    handleDialogClose();
    setIsUpdate(false);
  };

  // HANDLE DELETE SupportEmployee DIALOG OPEN
  const handleDeleteSupportEmployeeDialogOpen = (deleteData) => {
    setSupportEmployeeIdForDelete(deleteData._id);
    handleDeleteDialogOpen();
  };

  // HANDLE DELETE SupportEmployee SUBMIT
  const handleDeleteSupportEmployeeSubmit = async () => {
    try {
      await deleteSupportEmployee({
        SupportEmployeeId: SupportEmployeeIdForDelete,
        merchant: user?.merchant,
        isTrash: true
      }).unwrap();

      setSupportEmployeeIdForDelete('');
      handleDeleteDialogClose();
      refetch();
    } catch (error) {
      console.error('Failed to delete support employee:', error);
    }
  };

  // TABLE COLUMNS
  const columns = [
    {
      Header: 'Employee',
      Footer: 'Employee',
      accessor: 'employee',
      dataType: 'text',
      disableGroupBy: true,
      aggregate: 'count',
      disableFilters: true,
      Cell: ({ value }) => {
        return employeeObject && employeeObject[value]?.name;
      }
    },
    {
      Header: 'StartTime',
      Footer: 'StartTime',
      accessor: 'startTime',
      dataType: 'text',
      filter: 'fuzzyText',
      disableFilters: true,
      disableGroupBy: true,
      Cell: ({ value }) => {
        return value ? value : 'N/A';
      }
    },
    {
      Header: 'EndTime',
      Footer: 'EndTime',
      accessor: 'endTime',
      dataType: 'text',
      filter: 'fuzzyText',
      disableFilters: true,
      disableGroupBy: true,
      Cell: ({ value }) => {
        return value ? value : 'N/A';
      }
    },
    {
      Header: 'Remarks',
      Footer: 'Remarks',
      accessor: 'remarks',
      dataType: 'text',
      filter: 'fuzzyText',
      disableFilters: true,
      disableGroupBy: true,
      Cell: ({ value }) => {
        return value ? value : 'N/A';
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
        const date = row?.original?.createdAt;
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
          <ActionCell
            ellipsis={user?.role === 'MERCHANT'}
            row={row}
            isExpandable={false}
            setOpen={updateSupportEmployeeHandler}
            permissionKey="SupportEmployeePermissions"
            menuItems={[
              {
                title: 'Delete',
                icon: <DeleteFilled />,
                handleClick: handleDeleteSupportEmployeeDialogOpen
              }
            ]}
          />
        );
      }
    }
  ];

  // FORM SUBMISSION HANDLER
  const handleFormSubmit = async (data) => {
    try {
      if (isUpdate) {
        await updateSupportEmployee({ data, handleCloseDialog, setError, reset }).unwrap();
      } else {
        await createSupportEmployee({ data, handleCloseDialog, setError, reset }).unwrap();
      }
      handleCloseDialog();
      refetch();
    } catch (error) {
      console.error('Failed to submit form:', error);
    }
  };

  return (
    <Box>
      <Table
        {...{
          title: 'Support Employee',
          subheader: 'List of Support Employees',
          hasAction: true,
          columns,
          data,
          hasSelection: true,
          openDialog: open,
          handleCloseDialog: handleDialogClose,
          addButtonLabel: user?.role === 'MERCHANT',
          isLoading: isLoading || isFetching,
          hasSerial: true,
          handleAddButton,
          isServerFilter: false,
          isServerPagination: false,
          tableColumnDependency: [employeeObject],
          rowHiddenName: 'SupportEmployee',
          refetch
        }}
      />

      {/* dialog form */}
      <SupportEmployeeForm
        {...{
          updateSupportEmployee,
          createSupportEmployee,
          employeeLabelValue,
          handleCloseDialog,
          isUpdate,
          defaultValues,
          isLoading: isUpdating || isCreating,
          user,
          formType: 'dialog',
          openDialog: open,
          handleFormSubmit 
        }}
      />

    </Box>
  );
};

export default SupportEmployee;
