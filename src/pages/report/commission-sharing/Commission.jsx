/* eslint-disable react-hooks/exhaustive-deps */
import { DeleteFilled, UserOutlined } from '@ant-design/icons';
import { Box, Chip, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import Table from 'components/custom/table/Table';
import useAuth from 'hooks/useAuth';
import { useGetClientOptionQueryQuery } from 'api/service/client.service';
import dayjs from 'dayjs';
import { convertToObject } from 'utils/convert-to-object';
import { useGetCommissionQuery } from 'api/service/bill.service';
import { LocationOnOutlined, RouterOutlined, StayCurrentPortraitOutlined } from '@mui/icons-material';
import { useGetRouterQuery } from 'api/service/router.service';
import { convertToLabel } from 'utils/form-label-converter';
import { useGetPackageQuery } from 'api/service/package.service';

const Commission = () => {
  // =======================|| CUSTOM HOOK ||=======================
  // -> DIALOGUE HANDLER
  // const { deleteOpen, handleDialogClose, handleDeleteDialogOpen, handleDeleteDialogClose, title } = useDialog();

  // -> USER FROM AUTH
  const { user } = useAuth();

  // =======================|| LOCAL STATE ||=======================
  const [tableData, setTableData] = useState([]);

  // ===========================|| COMMISSION REPORT ||===========================
  // @GET COMMISSION REPORT
  const { data, isLoading, refetch, isFetching, isSuccess } = useGetCommissionQuery(user?.merchant, {
    skip: !user
  });

  // // @GET CLIENT OPTION
  // const { clientDataObject, isLoading: clientIsLoading } = useGetClientOptionQueryQuery(user?.merchant, {
  //   skip: !user,
  //   selectFromResult: ({ data, ...rest }) => {
  //     return {
  //       clientDataObject: convertToObject(data, 'value', ['label']),
  //       ...rest
  //     };
  //   }
  // });

  // @GET ROUTERS AND ROUTER OBJECT
  const { routers } = useGetRouterQuery(user?.merchant, {
    skip: !user,
    selectFromResult: ({ data, ...rest }) => ({
      routers: convertToLabel(data, 'name', '_id'),
      ...rest
    })
  });

  // @GET PACKAGES AND PACKAGE OBJECT
  const {
    packages,
    packageObject,
    isLoading: isPackageLoading
  } = useGetPackageQuery(user?.merchant, {
    skip: !user,
    selectFromResult: ({ data, ...rest }) => {
      return {
        packages: convertToLabel(data, 'pppoeProfile', '_id', 'router'),
        packageObject: convertToObject(data, ['_id'], ['pppoeProfile']),
        ...rest
      };
    }
  });

  // =======================|| TABLE COLUMNS ||=======================
  const columns = [
    {
      Header: 'Client Info',
      Footer: 'Client Info',
      accessor: 'name',
      dataType: 'text',
      disableGroupBy: true,
      aggregate: 'count',
      disableFilters: true,
      Cell: ({ value, row }) => {
        return (
          <>
            <Tooltip title="Client Name" placement="right" arrow>
              <Typography variant="body2" noWrap color="textSecondary" component="div">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <StayCurrentPortraitOutlined fontSize="inherit" />
                  {row.original?.clientId || 'N/A'}
                </Stack>
              </Typography>
              <Typography variant="h6" noWrap color="textPrimary" component="div">
                <UserOutlined fontSize="inherit" /> {value}
              </Typography>
            </Tooltip>
            <Tooltip title="PPPOE Name" placement="right" arrow>
              <Typography variant="body2" color="textPrimary" component="div">
                <RouterOutlined fontSize="inherit" /> {row.original?.routerClientDetails?.name}
              </Typography>
            </Tooltip>
          </>
        );
      }
      // Aggregated: ({ value }) => `${value} `
    },
    {
      Header: 'Router Info',
      Footer: 'Router Info',
      accessor: 'router',
      dataType: 'text',
      disableGroupBy: true,
      aggregate: 'count',
      disableFilters: true,
      Cell: ({ value, row }) => {
        const findRouter = routers?.find((item) => item.value === value);
        return (
          <>
            <Tooltip title="Client Name" placement="right" arrow>
              <Typography variant="h6" noWrap color="textPrimary" component="div">
                <UserOutlined fontSize="inherit" /> {findRouter?.label}
              </Typography>
            </Tooltip>
            <Tooltip title="PPPOE Name" placement="right" arrow>
              <Typography variant="body2" color="textPrimary" component="div">
                <RouterOutlined fontSize="inherit" /> {packageObject?.[row?.original?.package]?.pppoeProfile}
              </Typography>
            </Tooltip>
          </>
        );
      }
      // Aggregated: ({ value }) => `${value} `
    },
    {
      Header: 'Monthly Fee',
      Footer: 'Monthly Fee',
      accessor: 'fee',
      dataType: 'text',
      filter: 'fuzzyText',
      disableFilters: true,
      disableGroupBy: true,
      Cell: ({ value, row }) => {
        return value;
      }
    },
    {
      Header: 'Merchant',
      Footer: 'Merchant',
      accessor: 'commission?.merchant',
      dataType: 'text',
      disableGroupBy: true,
      aggregate: 'count',
      disableFilters: true,
      Cell: ({ value, row }) => {
        return (
          <>
            <Tooltip title="Client Name" placement="right" arrow>
              <Typography variant="h6" noWrap color="textPrimary" component="div">
                {row.original?.commission?.merchant ? (row.original.fee * row.original?.commission?.merchant).toFixed(2) : row.original.fee}
              </Typography>
            </Tooltip>
          </>
        );
      }
      // Aggregated: ({ value }) => `${value} `
    },
    {
      Header: 'Reseller',
      Footer: 'Reseller',
      accessor: 'commission?.reseller',
      dataType: 'text',
      disableGroupBy: true,
      aggregate: 'count',
      disableFilters: true,
      Cell: ({ value, row }) => {
        return (
          <>
            <Tooltip title="Client Name" placement="right" arrow>
              <Typography variant="h6" noWrap color="textPrimary" component="div">
                {row.original?.commission?.reseller ? (row.original.fee * row.original?.commission?.reseller).toFixed(2) : 0}
              </Typography>
            </Tooltip>
            {/* <Tooltip title="PPPOE Name" placement="right" arrow>
              <Typography variant="body2" color="textPrimary" component="div">
                <RouterOutlined fontSize="inherit" /> {packageObject?.[row?.original?.package]?.pppoeProfile}
              </Typography>
            </Tooltip> */}
          </>
        );
      }
      // Aggregated: ({ value }) => `${value} `
    },
    {
      Header: 'Sub Reseller',
      Footer: 'Sub Reseller',
      accessor: 'commission?.subReseller',
      dataType: 'text',
      disableGroupBy: true,
      aggregate: 'count',
      disableFilters: true,
      Cell: ({ value, row }) => {
        return (
          <>
            <Tooltip title="Client Name" placement="right" arrow>
              <Typography variant="h6" noWrap color="textPrimary" component="div">
                {row.original?.commission?.subReseller ? (row.original.fee * row.original?.commission?.subReseller).toFixed(2) : 0}
              </Typography>
            </Tooltip>
          </>
        );
      }
      // Aggregated: ({ value }) => `${value} `
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
    }

    // {
    //   id: 'action',
    //   Footer: 'Actions',
    //   disableSortBy: true,
    //   disableFilters: true,
    //   disableGroupBy: true,
    //   Aggregated: () => null,
    //   Header: 'Actions',
    //   className: 'cell-center',
    //   // eslint-disable-next-line react/prop-types
    //   Cell: ({ row }) => {
    //     return (
    //       <>
    //         <ActionCell
    //           ellipsis={true}
    //           row={row}
    //           hasEditButton={false}
    //           isExpandable={false}
    //           menuItems={[
    //             {
    //               title: 'Delete',
    //               icon: <DeleteFilled />,
    //               handleClick: handleDeleteDialogOpen
    //             }
    //           ]}
    //         />
    //       </>
    //     );
    //   }
    // }
  ];

  //@ USEEFFECT HOOK FOR SETTING MAIN DATA INTO TABLE DATA
  useEffect(() => {
    if (isSuccess) {
      setTableData(data);
    }
  }, [isSuccess]);

  //@WRAPPING MAIN DATA USING useMemo HOOK

  const actualTableData = useMemo(() => (tableData ? tableData : data), [data, tableData]);

  return (
    <Box>
      <Table
        {...{
          title: 'Commission',
          subheader: 'List of Commission',
          hasAction: true,
          columns,
          data: actualTableData,
          hasSelection: false,
          // handleCloseDialog: handleDialogClose,
          isLoading: isLoading || isFetching,
          hasSerial: true,
          rowHiddenName: 'commission',
          isServerPagination: false,
          tableColumnDependency: [],
          hasFilteredDrawer: false,
          isServerFilter: false,
          setTableData,
          refetch
        }}
      ></Table>

      {/* <DeletionAlert title={title} open={deleteOpen} handleClose={handleDeleteDialogClose} /> */}
    </Box>
  );
};

export default Commission;
