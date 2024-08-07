/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Chip, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import Table from 'components/custom/table/Table';
import useAuth from 'hooks/useAuth';
import { useGetClientOptionQueryQuery } from 'api/service/client.service';
import dayjs from 'dayjs';
import { convertToObject } from 'utils/convert-to-object';
import { useGetBillReportQuery } from 'api/service/bill.service';
import { useGetAllUserQuery } from 'api/service/users.service';

const BillReport = () => {
  // =======================|| CUSTOM HOOK ||=======================

  // -> USER FROM AUTH
  const { user } = useAuth();

  // =======================|| LOCAL STATE ||=======================
  const [tableData, setTableData] = useState(null);

  // ===========================|| BILL REPORT ||===========================
  // @GET BILL REPORT
  const { data, isLoading, refetch, isFetching, isSuccess } = useGetBillReportQuery(user?.merchant, {
    skip: !user
  });

  // @GET CLIENTS
  const { data: users, isLoading: userLoading } = useGetAllUserQuery(user?.merchant, {
    skip: !user
  });

  // @GET CLIENT OPTION
  const { clientDataObject, isLoading: clientIsLoading } = useGetClientOptionQueryQuery(user?.merchant, {
    skip: !user,
    selectFromResult: ({ data, ...rest }) => {
      return {
        clientDataObject: convertToObject(data, 'value', ['label']),
        ...rest
      };
    }
  });

  // =======================|| TABLE COLUMNS ||=======================
  const columns = [
    {
      Header: 'Client',
      Footer: 'Client',
      accessor: 'client',
      dataType: 'text',
      disableGroupBy: true,
      aggregate: 'count',
      disableFilters: true,
      // eslint-disable-next-line react/prop-types
      Cell: ({ value }) => {
        if (clientIsLoading) {
          return <Skeleton variant="text" width={100} />;
        }
        return <>{clientDataObject?.[value]?.label}</>;
      }
    },
    {
      Header: 'billing Type & bill type',
      Footer: 'billing Type & bill type',
      accessor: 'billingType',
      dataType: 'text',
      filter: 'fuzzyText',
      disableFilters: true,
      disableGroupBy: true,
      // eslint-disable-next-line react/prop-types
      Cell: ({ value, row }) => {
        return (
          <Stack gap={1}>
            <Chip label={value} size="small" />
            {/* eslint-disable-next-line react/prop-types */}
            <Chip label={row?.original?.billType} size="small" />
          </Stack>
        );
      }
    },
    {
      Header: 'device',
      Footer: 'device',
      accessor: 'device',
      dataType: 'text',
      filter: 'fuzzyText',
      disableFilters: true,
      disableGroupBy: true
    },
    {
      Header: 'amount',
      Footer: 'amount',
      accessor: 'amount',
      dataType: 'text',
      filter: 'fuzzyText',
      disableFilters: true,
      disableGroupBy: true
    },
    {
      Header: 'discount',
      Footer: 'discount',
      accessor: 'discount',
      dataType: 'text',
      filter: 'fuzzyText',
      disableFilters: true,
      disableGroupBy: true,
      Cell: ({ value }) => {
        return value ? value : '0';
      }
    },
    {
      Header: 'Payment Method',
      Footer: 'Payment Method',
      accessor: 'paymentMethod',
      dataType: 'text',
      filter: 'fuzzyText',
      disableFilters: true,
      disableGroupBy: true
    },
    {
      Header: 'Commission',
      Footer: 'Commission',
      accessor: 'commission',
      dataType: 'text',
      filter: 'fuzzyText',
      disableFilters: true,
      disableGroupBy: true,
      Cell: ({ value, row }) => {
        return (
          <>
            <Tooltip title="Merchant Rate" placement="right" arrow>
              <Typography variant="h6" noWrap color="textPrimary" component="div">
                Merchant: {row.original?.commission?.merchant ? row.original?.commission?.merchant : row.original.currentState?.fee}
              </Typography>
            </Tooltip>
            <Tooltip title="Reseller Rate" placement="right" arrow>
              <Typography variant="h6" noWrap color="textPrimary" component="div">
                Reseller: {row.original?.commission?.reseller ? row.original?.commission?.reseller : 0}
              </Typography>
            </Tooltip>
            <Tooltip title="Sub Reseller Rate" placement="right" arrow>
              <Typography variant="h6" noWrap color="textPrimary" component="div">
                Sub Reseller: {row.original?.commission?.subReseller ? row.original?.commission?.subReseller : 0}
              </Typography>
            </Tooltip>
          </>
        );
      }
    },
    {
      Header: 'Collected By',
      Footer: 'Collected By',
      accessor: 'collectedBy',
      dataType: 'text',
      disableGroupBy: true,
      aggregate: 'count',
      disableFilters: true,
      // Aggregated: ({ value }) => `${value} `
      // eslint-disable-next-line react/prop-types

      Cell: ({ value, row }) => {
        const findUser = users?.find((item) => item._id === value);
        return (
          <>
            <Typography variant="h6" noWrap color="textPrimary" component="div">
              Name: {findUser?.name}
            </Typography>
            <Typography variant="h6" noWrap color="textPrimary" component="div">
              Role: {findUser?.role}
            </Typography>
          </>
        );
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
      Header: 'Date',
      Footer: 'Date',
      accessor: 'updatedAt',
      dataType: 'text',
      filter: 'fuzzyText',
      disableFilters: true,
      disableGroupBy: true,
      Cell: ({ value }) => {
        return new Date(value).toLocaleDateString();
      }
    }
  ];

  useEffect(() => {
    if (isSuccess) {
      setTableData(data);
    }
  }, [isSuccess]);

  // ====================== FILTER AREA ======================
  const filterDefaultValue = {
    createdAtDateRange: []
  };

  const filterFormData = [
    {
      type: 'date-range-picker',
      name: 'createdAtDateRange',
      label: 'Select Created At Date Range',
      placeholder: 'Select Created At Date Range',
      visibility: true,
      disabled: false,
      required: true,
      id: 'createdAtDateRange',
      size: 'small',
      disabledFuture: true,
      column: { xs: 1 }
    }
  ];

  const clientHandleApplyFilterSubmit = (filterDataField) => {
    const { createdAtDateRange } = filterDataField;

    if (createdAtDateRange) {
      const [startDate, endDate] = createdAtDateRange;
      const filterData = data.filter((item) => {
        return new Date(item.createdAt) >= new Date(startDate) && new Date(item.createdAt) <= new Date(endDate);
      });
      setTableData(filterData);
    }
  };

  const actualTableData = useMemo(() => (tableData ? tableData : data), [data, tableData]);

  return (
    <Box>
      <Table
        {...{
          title: 'Bill Report',
          subheader: 'List of Bill Report',
          hasAction: true,
          columns,
          data: actualTableData,
          hasSelection: false,
          isLoading: isLoading || isFetching,
          hasSerial: true,
          rowHiddenName: 'billReport',
          isServerPagination: false,
          tableColumnDependency: [clientDataObject],
          hasFilteredDrawer: false,
          isServerFilter: false,
          filterFormData,
          setTableData,
          clientHandleApplyFilterSubmit,
          refetch,
          filterDefaultValue
        }}
      ></Table>
    </Box>
  );
};

export default BillReport;
