/* eslint-disable react-hooks/exhaustive-deps */
import { DeleteFilled } from '@ant-design/icons';
import { Box, Skeleton } from '@mui/material';
import DeletionAlert from 'components/custom/alert/DeleteAlert';
import useDialog from 'components/custom/hooks/useDialog';
import ActionCell from 'components/custom/table/ActionCell';
import React, { useMemo, useState } from 'react';
import Table from 'components/custom/table/Table';
import useAuth from 'hooks/useAuth';
import dayjs from 'dayjs';
import IncomeTypeFrom from './IncomeTypeForm';
import {
  useCreateIncomeTypeMutation,
  useDeleteOrRestoreIncomeTypeMutation,
  useGetIncomeTypeQuery,
  useUpdateIncomeTypeMutation
} from 'api/service/incomeType.service';
import { useGetEmployeeQuery } from 'api/service/employee.service';
import { convertToObject } from 'utils/convert-to-object';

const IncomeType = () => {
  /**
   * -> DEFAULT VALUE
   * **/
  const DEFAULT_VALUE = { name: '', employee: '', remarks: '' };
  /*
   * -> DIALOGUE HANDLER
   * **/
  const {
    open,
    deleteOpen,
    handleDialogOpen,
    handleDialogClose,
    handleDeleteDialogOpen,
    handleDeleteDialogClose,
    title,
    drawerOpen,
    handleDrawerOpen
  } = useDialog();

  /**
   * -> USER FROM AUTH
   * **/
  const { user } = useAuth();

  /**
   * -> INCOME TYPES RELATED RTK HOOKS QUERY
   **/
  const { data, isLoading, refetch, isFetching } = useGetIncomeTypeQuery(user.merchant);

  const [selectedRows, setSelectedRows] = useState([]);
  const [incomeTypeIdForDelete, setIncomeTypeIdDelete] = useState('');
  /**
   * -> INCOME TYPES RELATED RTK HOOKS MUTATION
   *
   **/
  const [updateIncomeType, { isLoading: isUpdating }] = useUpdateIncomeTypeMutation();
  const [createIncomeType, { isLoading: isCreating }] = useCreateIncomeTypeMutation();
  const [deleteIncomeType, { isLoading: deleteIncomeTypeLoading }] = useDeleteOrRestoreIncomeTypeMutation();

  /**
   * -> INCOME TYPES RELATED RTK HOOKS MUTATION
   *
   **/
  const { employeeObj, isLoading: isEmployeeLoading } = useGetEmployeeQuery(user.merchant, {
    skip: !user,
    selectFromResult: ({ data, ...rest }) => {
      const employeeObj = convertToObject(data, ['_id'], ['name']);
      return { employeeObj, rest };
    }
  });

  /**
   * -> LOCAL STATE
   * **/
  const [defaultValues, setDefaultValue] = useState(DEFAULT_VALUE);
  const [isUpdate, setIsUpdate] = useState(false);

  /**
   * -> MANAGE INCOME TYPES ID STATE FOR CREATE AND UPDATE SUB INCOME TYPES
   * **/
  const [incomeTypeId, setIncomeTypeId] = useState('');

  /**
   * -> FUNCTION TO HANDLE UPDATE
   * **/
  const updateIncomeTypeHandler = (data) => {
    handleDialogOpen();
    setDefaultValue({ name: data.name, remarks: data.remarks, employee: data.employee, _id: data._id });
    setIsUpdate(true);
    setIncomeTypeId(data._id);
  };

  const handleAddButton = () => {
    setDefaultValue(DEFAULT_VALUE);
    handleDialogOpen();
    setIsUpdate(false);
    setIncomeTypeId('');
  };

  const handleCloseDialog = () => {
    setDefaultValue(DEFAULT_VALUE);
    handleDialogClose();
    setIsUpdate(false);
    setIncomeTypeId('');
  };

  // -> HANDLE DELETE INCOME TYPES DIALOG OPEN
  const handleDeleteIncomeTypeDialogOpen = (deleteData) => {
    setIncomeTypeIdDelete(deleteData._id);
    setSelectedRows(null);
    handleDeleteDialogOpen();
  };

  // -> HANDLE DELETE INCOME TYPES SUBMIT
  const handleDeleteIncomeTypeSubmit = () => {
    deleteIncomeType({
      handleDeleteSuccess: () => {
        setSelectedRows(null);
        setIncomeTypeIdDelete('');
        handleDeleteDialogClose();
      },
      incomeTypeId: incomeTypeIdForDelete,
      merchant: user?.merchant,
      isTrash: true
    });
  };

  /**
   * -> TABLE COLUMNS
   * **/
  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        Footer: 'Name',
        accessor: 'name',
        dataType: 'text',
        disableGroupBy: true,
        aggregate: 'count',
        disableFilters: true
      },
      {
        Header: 'Employee',
        Footer: 'Employee',
        accessor: 'employee',
        dataType: 'text',
        disableGroupBy: true,
        aggregate: 'count',
        disableFilters: true,
        Cell: ({ value }) => {
          if (isEmployeeLoading) {
            return <Skeleton variant="text" width={100} height={20} />;
          }
          return employeeObj?.[value]?.name || 'N/A';
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
            <>
              <ActionCell
                ellipsis={true}
                row={row}
                isExpandable={false}
                setOpen={updateIncomeTypeHandler}
                menuItems={[
                  {
                    title: 'Delete',
                    icon: <DeleteFilled />,
                    handleClick: handleDeleteIncomeTypeDialogOpen
                  }
                ]}
              />
            </>
          );
        }
      }
    ],
    [employeeObj]
  );

  return (
    <Box>
      <Table
        {...{
          title: 'IncomeType list',
          subheader: 'List of IncomeType',
          buttonTitleName: 'Add Income Type',
          hasAction: true,
          columns,
          data: data || [],
          hasSelection: false,
          openDialog: open,
          handleCloseDialog: handleDialogClose,
          setSelectedRows,
          drawerOpen,
          handleDrawerOpen,
          addButtonLabel: 'incomeType add',
          handleAddButton,
          isLoading: isLoading || isFetching,
          hasSerial: true,
          isServerFilter: false,
          isServerPagination: false,
          rowHiddenName: 'incomeType',
          refetch
        }}
      ></Table>

      {/* dialog from */}
      <IncomeTypeFrom
        {...{
          updateIncomeType,
          createIncomeType,
          handleCloseDialog,
          isUpdate,
          defaultValues,
          isLoading: isUpdating || isCreating,
          user,
          incomeTypeId,
          formType: 'dialog',
          openDialog: open
        }}
      />

      <DeletionAlert
        title={title}
        open={deleteOpen}
        handleSubmission={handleDeleteIncomeTypeSubmit}
        isLoading={deleteIncomeTypeLoading}
        handleClose={handleDeleteDialogClose}
      />
    </Box>
  );
};

export default IncomeType;
