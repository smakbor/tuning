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
import { useGetEmployeeQuery } from 'api/service/employee.service';
import { convertToObject } from 'utils/convert-to-object';
import {
  useCreateIncomeMutation,
  useDeleteOrRestoreIncomeMutation,
  useGetIncomeQuery,
  useUpdateIncomeMutation
} from 'api/service/income.service';
import IncomeFrom from './IncomeFrom';
import { useGetIncomeTypeQuery } from 'api/service/incomeType.service';

const Income = () => {
  /**
   * -> DEFAULT VALUE
   * **/
  const DEFAULT_VALUE = { employee: '', incomeType: '', amount: '', remarks: '' };
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
  const { user, activeBranch } = useAuth();

  /**
   * -> INCOME RELATED RTK HOOKS QUERY
   **/
  const { data, isLoading, refetch, isFetching } = useGetIncomeQuery(user?.merchant, {
    skip: !user || !activeBranch
  });

  const [selectedRows, setSelectedRows] = useState([]);
  const [incomeIdForDelete, setIncomeTypeIdDelete] = useState('');
  /**
   * -> INCOME RELATED RTK HOOKS MUTATION
   *
   **/
  const [updateIncome, { isLoading: isUpdating }] = useUpdateIncomeMutation();
  const [createIncome, { isLoading: isCreating }] = useCreateIncomeMutation();
  const [deleteIncome, { isLoading: deleteIncomeLoading }] = useDeleteOrRestoreIncomeMutation();

  /**
   * -> EMPLOYEE RELATED RTK HOOKS MUTATION
   *
   **/
  const { employeeObj, isLoading: isEmployeeLoading } = useGetEmployeeQuery(user.merchant, {
    skip: !user || !activeBranch,
    selectFromResult: ({ data, ...rest }) => {
      const employeeObj = convertToObject(data, ['_id'], ['name']);
      return { employeeObj, rest };
    }
  });
  /**
   * -> EMPLOYEE RELATED RTK HOOKS MUTATION
   *
   **/
  const { income, isLoading: isIncomeLoading } = useGetIncomeTypeQuery(user.merchant, {
    skip: !user,
    selectFromResult: ({ data, ...rest }) => {
      const income = convertToObject(data, ['_id'], ['name']);
      return { income, rest };
    }
  });

  /**
   * -> LOCAL STATE
   * **/
  const [defaultValues, setDefaultValue] = useState(DEFAULT_VALUE);
  const [isUpdate, setIsUpdate] = useState(false);

  /**
   * -> MANAGE INCOME ID STATE FOR CREATE AND UPDATE SUB INCOME
   * **/
  const [incomeId, setIncomeTypeId] = useState('');

  /**
   * -> FUNCTION TO HANDLE UPDATE
   * **/
  const updateIncomeHandler = (data) => {
    handleDialogOpen();
    setDefaultValue({
      name: data.name,
      incomeType: data.incomeType,
      amount: data.amount,
      remarks: data.remarks,
      employee: data.employee,
      _id: data._id
    });
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

  // -> HANDLE DELETE INCOME DIALOG OPEN
  const handleDeleteIncomeDialogOpen = (deleteData) => {
    setIncomeTypeIdDelete(deleteData._id);
    setSelectedRows(null);
    handleDeleteDialogOpen();
  };

  // -> HANDLE DELETE INCOME SUBMIT
  const handleDeleteIncomeSubmit = () => {
    deleteIncome({
      handleDeleteSuccess: () => {
        setSelectedRows(null);
        setIncomeTypeIdDelete('');
        handleDeleteDialogClose();
      },
      incomeId: incomeIdForDelete,
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
        Header: 'IncomeType',
        Footer: 'IncomeType',
        accessor: 'incomeType',
        dataType: 'text',
        disableGroupBy: true,
        aggregate: 'count',
        disableFilters: true,
        Cell: ({ value }) => {
          if (isIncomeLoading) {
            return <Skeleton variant="text" width={100} height={20} />;
          }
          return income?.[value]?.name || 'N/A';
        }
      },
      {
        Header: 'Amount',
        Footer: 'Amount',
        accessor: 'amount',
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
            <>
              <ActionCell
                ellipsis={true}
                row={row}
                isExpandable={false}
                setOpen={updateIncomeHandler}
                menuItems={[
                  {
                    title: 'Delete',
                    icon: <DeleteFilled />,
                    handleClick: handleDeleteIncomeDialogOpen
                  }
                ]}
              />
            </>
          );
        }
      }
    ],
    [income, employeeObj]
  );

  return (
    <Box>
      <Table
        {...{
          title: 'Income list',
          subheader: 'List of Income',
          hasAction: true,
          columns,
          data: data || [],
          hasSelection: false,
          openDialog: open,
          handleCloseDialog: handleDialogClose,
          setSelectedRows,
          drawerOpen,
          handleDrawerOpen,
          addButtonLabel: 'income add',
          handleAddButton,
          isLoading: isLoading || isFetching,
          hasSerial: true,
          isServerFilter: false,
          isServerPagination: false,
          rowHiddenName: 'income',
          refetch
        }}
      ></Table>

      {/* dialog from */}
      <IncomeFrom
        {...{
          updateIncome,
          createIncome,
          handleCloseDialog,
          isUpdate,
          defaultValues,
          isLoading: isUpdating || isCreating,
          user,
          incomeId,
          formType: 'dialog',
          openDialog: open
        }}
      />

      <DeletionAlert
        title={title}
        open={deleteOpen}
        handleSubmission={handleDeleteIncomeSubmit}
        isLoading={deleteIncomeLoading}
        handleClose={handleDeleteDialogClose}
      />
    </Box>
  );
};

export default Income;
