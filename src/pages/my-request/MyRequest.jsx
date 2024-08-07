/* eslint-disable react-hooks/exhaustive-deps */
import { DeleteFilled } from '@ant-design/icons';
import { Box, Typography } from '@mui/material';
import ActionCell from 'components/custom/table/ActionCell';
import React, { useState } from 'react';
import Table from 'components/custom/table/Table';

import dayjs from 'dayjs';
import FilteringTable from 'pages/tables/react-table/filtering';
import useAuth from 'hooks/useAuth';
import { useGetRequestsQuery } from 'api/service/solution-request.service';

const MyRequest = () => {
  const { dbUserId } = useAuth();
  const { data: requests = [] } = useGetRequestsQuery(dbUserId, {
    skip: !dbUserId
  });

  const columns = [
    {
      Header: 'Request',

      accessor: 'request',
      disableGroupBy: true,
      aggregate: 'count'

      // Aggregated: ({ value }) => `${value}`
    },
    {
      Header: 'Make',

      accessor: 'make',
      filter: 'fuzzyText',
      disableGroupBy: true,
      Cell: ({ value }) => {
        return value ? value : 'N/A';
      }
    },
    {
      Header: 'Controller',

      accessor: 'controller',
      filter: 'fuzzyText',
      disableGroupBy: true,
      Cell: ({ value }) => {
        return value ? value : 'N/A';
      }
    },

    {
      Header: 'Date',

      accessor: 'createdAt',
      filter: 'fuzzyText',
      disableGroupBy: true,
      Cell: ({ row }) => {
        const date = row?.original?.createdAt;
        return date ? dayjs(date).format('lll') : 'N/A';
      }
    },
    {
      Header: 'Status',

      accessor: 'status',
      filter: 'fuzzyText',
      disableGroupBy: true,
      Cell: ({ value }) => {
        return value ? value : 'N/A';
      }
    }
    // {
    //   id: 'details',
    //   disableSortBy: true,
    //   disableGroupBy: true,
    //   // Aggregated: () => null,
    //   Header: 'Details',
    //   className: 'cell-center',
    //   // eslint-disable-next-line react/prop-types
    //   Cell: ({ row }) => {
    //     return (
    //       <>
    //         <ActionCell
    //           ellipsis={true}
    //           row={row}
    //           isExpandable={false}
    //           setOpen={() => console.log('modal open')}
    //           menuItems={[
    //             {
    //               title: 'Delete',
    //               icon: <DeleteFilled />,
    //               handleClick: () => console.log('hello')
    //             }
    //           ]}
    //         />
    //       </>
    //     );
    //   }
    // }
  ];

  return (
    <Box>
      <Box sx={{ marginBottom: '1.3rem' }}>
        <Typography variant="h4">My Requests</Typography>
      </Box>
      <FilteringTable data={requests} column={columns} />
    </Box>
  );
};

export default MyRequest;
