/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Chip, IconButton, Tooltip, Typography } from '@mui/material';
import useDialog from 'components/custom/hooks/useDialog';
import Table from 'components/custom/table/Table';
import useAuth from 'hooks/useAuth';
import dayjs from 'dayjs';
import { useGetActivityLogQuery } from 'api/service/activityLog.service';
import { EyeOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import BasicDialogWithCLoseBtn from 'components/custom/dialog/BasicDialogWithCLoseBtn';
import ActivityLogDetail from './ActivityLogDetail';

const ActivityLog = () => {
  // ======================== CUSTOM HOOKS ========================
  // -> DIALOGUE HOOKS
  const { open, handleDialogOpen, handleDialogClose } = useDialog();
  // -> USER FROM AUTH
  const { user, activeBranch } = useAuth();

  // ======================== INTERNAL HOOKS ========================
  // -> LOCAL STATE
  const [activityLogDialogData, setActivityLogDialogData] = useState({});

  // ======================== RTK HOOKS ========================
  // @GET ACTIVITY LOG
  const { data, isLoading } = useGetActivityLogQuery(undefined, {
    skip: !user || !activeBranch,
    refetchOnMountOrArgChange: true
  });

  // ======================== FUNCTIONS ========================
  const handleOpenDialog = (activityLogSingleData) => {
    setActivityLogDialogData(activityLogSingleData);
    handleDialogOpen();
  };

  // ==================== TABLE COLUMNS ====================
  const columns = [
    {
      Header: 'Name',
      Footer: 'Name',
      accessor: 'merchant.name',
      dataType: 'text',
      disableGroupBy: true,
      disableFilters: true
    },
    {
      Header: 'Role',
      Footer: 'Role',
      accessor: 'role',
      dataType: 'text',
      disableGroupBy: true,
      disableFilters: true,
      // eslint-disable-next-line react/prop-types
      Cell: ({ value }) => {
        if (value === 'MERCHANT') {
          return <Chip icon={<UserOutlined />} label={value} variant="light" color="success" />;
        }
        if (value === 'RESELLER') {
          return <Chip icon={<UserOutlined />} label={value} variant="light" color="primary" />;
        }

        return <Chip icon={<UserOutlined />} label={value} variant="light" />;
      }
    },
    {
      Header: 'Action',
      Footer: 'Action',
      accessor: 'action',
      dataType: 'text',
      disableGroupBy: true,
      disableFilters: true,
      // eslint-disable-next-line react/prop-types
      Cell: ({ value }) => {
        if (value === 'DELETE') {
          return <Chip label={value} variant="light" color="error" />;
        }
        if (value === 'CREATE') {
          return <Chip label={value} variant="light" color="info" />;
        }

        if (value === 'UPDATE') {
          return <Chip label={value} variant="light" color="warning" />;
        }

        return <Chip label={value} />;
      }
    },

    {
      Header: 'Description',
      Footer: 'Description',
      accessor: 'description',
      dataType: 'text',
      filter: 'fuzzyText',
      disableFilters: true,
      disableGroupBy: true,
      // eslint-disable-next-line react/prop-types
      Cell: ({ value }) => {
        return (
          <Typography textTransform="capitalize" variant="body2">
            {/* eslint-disable-next-line react/prop-types */}
            {value.length > 50 ? `${value.substring(0, 50)}...` : value}
          </Typography>
        );
      }
    },
    // {
    //   Header: 'UpdateAt',
    //   Footer: 'UpdateAt',
    //   accessor: 'updatedAt',
    //   dataType: 'text',
    //   filter: 'fuzzyText',
    //   disableFilters: true,
    //   disableGroupBy: true,
    //   Cell: ({ row }) => {
    //     const date = row?.original?.createdAt;
    //     return date && dayjs(date).format('lll');
    //   }
    // },
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
      id: 'actions',
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
            <Tooltip title="View Details" arrow>
              {/* eslint-disable-next-line react/prop-types */}
              <IconButton onClick={() => handleOpenDialog(row?.original)} color="primary">
                <EyeOutlined />
              </IconButton>
            </Tooltip>
          </>
        );
      }
    }
  ];

  return (
    <Box>
      <Table
        {...{
          title: 'Activity Log',
          subheader: 'List of Activity Logs',
          hasAction: true,
          columns: columns,
          data,
          hasSelection: true,
          isLoading,
          hasSerial: true,
          isExpandable: false,
          isServerPagination: false,
          isServerFilter: false
        }}
      />

      <BasicDialogWithCLoseBtn
        dialogTitle={
          <Typography variant="h5">
            {activityLogDialogData?.data?.[0]?.module ? (
              <>
                Activity Log of - <Chip size="small" label={activityLogDialogData?.data?.[0]?.module} />
              </>
            ) : (
              "Activity Log's Details"
            )}
          </Typography>
        }
        openDialog={open}
        handleDialogClose={handleDialogClose}
      >
        <ActivityLogDetail activityLogDialogData={activityLogDialogData} />
      </BasicDialogWithCLoseBtn>
    </Box>
  );
};
export default ActivityLog;
