/* eslint-disable react-hooks/exhaustive-deps */
import { DeleteFilled } from '@ant-design/icons';
import { Box } from '@mui/material';
import DeletionAlert from 'components/custom/alert/DeleteAlert';
import useDialog from 'components/custom/hooks/useDialog';
import ActionCell from 'components/custom/table/ActionCell';
import React, { useState } from 'react';
import Table from 'components/custom/table/Table';

import useAuth from 'hooks/useAuth';

import { useDeleteOrRestoreDepositMutation, useGetDepositsQuery } from 'api/service/deposit.service';
import DepositForm from './DepositForm';

/**
 * -> DEFAULT VALUE
 * **/
const DEFAULT_VALUE = {
  name: '',
  description: '',
  status: 'ACTIVE'
};

const OwnDeposit = () => {
  /**
   * -> DIALOGUE HOOKS
   * **/
  const { open, deleteOpen, handleDialogOpen, handleDialogClose, handleDeleteDialogOpen, handleDeleteDialogClose, title } = useDialog();

  const [selectedRows, setSelectedRows] = useState([]);
  const [depositIdForDelete, setDepositIdForDelete] = useState('');

  /**
   * -> USER FROM AUTH
   * **/
  const { user, activeBranch } = useAuth();

  /**
   * -> DEPOSIT Data TYPE RELATED RTK HOOKS QUERY
   **/
  const { data, isLoading } = useGetDepositsQuery(user?.merchant, {
    skip: !user || !activeBranch,
    selectFromResult: ({ data, ...rest }) => {
      return { data: data?.filter((item) => item.user === user?._id), ...rest };
    }
  });

  // -> RTK QUERY MUTATIONS
  const [deleteDeposit, { isLoading: deleteLoading }] = useDeleteOrRestoreDepositMutation();

  /**
   * -> LOCAL STATE
   * **/
  const [defaultValues, setDefaultValue] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);

  /**
   * -> FUNCTION TO HANDLE UPDATE
   * **/

  // ADD BUTTON HANDLER
  const handleAddButton = () => {
    setDefaultValue(DEFAULT_VALUE);
    handleDialogOpen();
    setIsUpdate(false);
  };

  // CLOSE DIALOG HANDLER
  const handleCloseDialog = () => {
    setDefaultValue(DEFAULT_VALUE);
    handleDialogClose();
    setIsUpdate(false);
  };

  // -> DELETE DIALOG POP UP OPEN
  const handleDepositDeleteDialogPopUpOpen = (depositData) => {
    setDepositIdForDelete(depositData?._id);
    handleDeleteDialogOpen();
  };

  // -> DELETE DEPOSIT
  const handleDepositDeleteSubmit = () => {
    deleteDeposit({
      depositId: depositIdForDelete,
      merchant: user?.merchant,
      handleDeleteSuccess: () => {
        setSelectedRows(null);
        setDepositIdForDelete('');
        handleDeleteDialogClose();
      },
      isTrash: true
    });
  };

  /**
   * -> TABLE COLUMNS
   * **/
  const columns = [
    {
      Header: 'Deposit By',
      Footer: 'Deposit By',
      accessor: 'depositBy',
      dataType: 'text',
      disableGroupBy: true,
      aggregate: 'count',
      disableFilters: true
      // Aggregated: ({ value }) => `${value} `
    },
    {
      Header: 'Total',
      Footer: 'Total',
      accessor: 'amount',
      dataType: 'text',
      filter: 'fuzzyText',
      disableFilters: true,
      disableGroupBy: true
    },
    {
      Header: 'Date',
      Footer: 'Date',
      accessor: 'createdAt',
      dataType: 'text',
      filter: 'fuzzyText',
      disableFilters: true,
      disableGroupBy: true,
      Cell: ({ value }) => {
        return new Date(value).toLocaleDateString();
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
      id: 'action',
      Footer: 'Actions',
      disableSortBy: true,
      disableFilters: true,
      disableGroupBy: true,
      // Aggregated: () => null,
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
              hasEditButton={false}
              menuItems={[
                {
                  title: 'Delete',
                  icon: <DeleteFilled />,
                  handleClick: handleDepositDeleteDialogPopUpOpen
                }
              ]}
            />
          </>
        );
      }
    }
  ];

  return (
    <Box>
      <Table
        {...{
          title: 'List of Deposit',
          addButtonLabel: 'Add Deposit',
          buttonTitleName: 'Add Deposit',
          handleAddButton,
          hasAction: true,
          columns: columns,
          data,
          isServerPagination: false,
          hasSelection: false,
          handleCloseDialog,
          setSelectedRows,
          isLoading,
          rowHiddenName: 'ownDeposit',
          hasSerial: true
        }}
      />

      {/* deposit form */}
      <DepositForm
        {...{
          defaultValues,
          handleCloseDialog,
          user,
          openDialog: open,
          formType: 'dialog'
        }}
      />

      <DeletionAlert
        isLoading={deleteLoading}
        title={title}
        handleSubmission={handleDepositDeleteSubmit}
        open={deleteOpen}
        handleClose={handleDeleteDialogClose}
      />
    </Box>
  );
};
export default OwnDeposit;
