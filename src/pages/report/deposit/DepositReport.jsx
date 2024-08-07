/* eslint-disable react-hooks/exhaustive-deps */
import { DeleteFilled } from '@ant-design/icons';
import { Box, Button, Stack } from '@mui/material';
import DeletionAlert from 'components/custom/alert/DeleteAlert';
import useDialog from 'components/custom/hooks/useDialog';
import ActionCell from 'components/custom/table/ActionCell';
import React, { useState } from 'react';
import Table from 'components/custom/table/Table';

import useAuth from 'hooks/useAuth';
import ShowStatus from 'components/custom/table/StatusChip';
import { useGetDepositReportQuery, useUpdateDepositStatusMutation } from 'api/service/deposit.service';

/**
 * -> DEFAULT VALUE
 * **/
const DEFAULT_VALUE = {
  depositBy: '',
  amount: '',
  remarks: ''
};

const DepositReport = () => {
  /**
   * -> DIALOGUE HOOKS
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

  const [selectedRows, setSelectedRows] = useState([]);

  /**
   * -> USER FROM AUTH
   * **/
  const { user } = useAuth();

  /**
   * -> DEPOSIT REPORT TYPE RELATED RTK HOOKS QUERY
   **/
  const { data, isLoading } = useGetDepositReportQuery(user?.merchant, {
    skip: !user
  });

  /**
   * -> DEPOSIT REPORT TYPE RELATED RTK HOOKS MUTATION
   **/
  const [updateAdjustStatus, { isLoading: adjustStatusLoading }] = useUpdateDepositStatusMutation();

  /**
   * -> LOCAL STATE
   * **/
  const [defaultValues, setDefaultValue] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);

  /**
   * -> FUNCTION TO HANDLE UPDATE
   * **/
  const updateDepositDataTypeHandler = (data) => {};

  // add button handler
  const handleAddButton = () => {
    setDefaultValue(DEFAULT_VALUE);
    handleDialogOpen();
    setIsUpdate(false);
  };

  // close dialog handler
  const handleCloseDialog = () => {
    setDefaultValue(DEFAULT_VALUE);
    handleDialogClose();
    setIsUpdate(false);
  };

  const handleAdjustStatus = ({ target }, depositId) => {
    if (target.value === 'ACCEPTED') {
      updateAdjustStatus({
        depositId,
        status: target.value,
        merchantId: user?.merchant
      });
    }
    if (target.value === 'REJECTED') {
      updateAdjustStatus({
        depositId,
        status: target.value,
        merchantId: user?.merchant
      });
    }
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
      disableGroupBy: true
    },
    {
      Header: 'Status',
      Footer: 'Status',
      accessor: 'status',
      dataType: 'text',
      filter: 'fuzzyText',
      disableFilters: true,
      disableGroupBy: true,
      // eslint-disable-next-line react/prop-types
      Cell: ({ value, row: { original } }) => {
        if (value === 'PENDING') {
          return (
            <Stack direction="row" gap={1}>
              <Button value="ACCEPTED" onClick={(event) => handleAdjustStatus(event, original?._id)} variant="shadow" size="extraSmall">
                Accept
              </Button>
              <Button
                value="REJECTED"
                onClick={(event) => handleAdjustStatus(event, original?._id)}
                variant="shadow"
                color="error"
                size="extraSmall"
              >
                Reject
              </Button>
            </Stack>
          );
        } else {
          return <ShowStatus value={value} />;
        }
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
              setOpen={updateDepositDataTypeHandler}
              menuItems={[
                {
                  title: 'Delete',
                  icon: <DeleteFilled />,
                  handleClick: handleDeleteDialogOpen
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
          title: 'Deposit Report',
          subheader: 'List of deposit report',
          hasAction: true,
          columns: columns,
          data,
          hasSelection: false,
          openDialog: open,
          handleCloseDialog,
          setSelectedRows,
          drawerOpen,
          handleDrawerOpen,
          isLoading,
          hasSerial: true,
          tableColumnDependency: [data, adjustStatusLoading],
          isServerPagination: false
        }}
      />

      <DeletionAlert title={title} open={deleteOpen} handleClose={handleDeleteDialogClose} />
    </Box>
  );
};
export default DepositReport;
