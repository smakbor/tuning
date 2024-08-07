import React from 'react';
import Table from 'components/custom/table/Table';
import { useGetCategorysQuery, useGetSubResellerTicketsQuery, useGetTypesQuery } from 'api/service/support.service';
import useAuth from 'hooks/useAuth';
import { Box, Stack, Typography } from '@mui/material';
import { convertToLabel } from 'utils/form-label-converter';
import ShowStatus from 'components/custom/table/StatusChip';
import dayjs from 'dayjs';
import ActionCell from 'components/custom/table/ActionCell';

const SubResellerTicket = () => {
  //===> USER FROM AUTH CONTEXT
  const { user } = useAuth();

  //========================||QUIRY HOOKS||========================//

  //===> @GET RESELLER SUPPPORT TICKETS
  const { data: subTickets, isLoading: subTicketLoading } = useGetSubResellerTicketsQuery(user?.merchant, {
    skip: !user
  });

  //===> @GET SUPPPORT TICKET TYPES
  const { types, isLoading: typeLoading } = useGetTypesQuery(user?.merchant, {
    skip: !user,
    selectFromResult: ({ data, ...rest }) => {
      return { types: convertToLabel(data, 'name', '_id'), ...rest };
    }
  });

  //===> @GET SUPPPORT TICKET CATEGORYS
  const { categorys, isLoading: categoryLoading } = useGetCategorysQuery(user?.merchant, {
    skip: !user,
    selectFromResult: ({ data, ...rest }) => {
      return { categorys: convertToLabel(data, 'name', '_id'), ...rest };
    }
  });

  //========================||FUNCTION HANDLERS||========================//

  //---> Dialog Close
  const handleCloseDialog = () => {
    handleDialogClose();
  };

  //---> Find Support Ticket 'type,category'
  const findSupportTicketTypeCategory = (value) => {
    let type, category;

    //---> Type find Ticket Type_id
    type = types?.find((item) => item.value === value?.type)?.label;

    //---> Type find Ticket Type_id
    category = categorys?.find((item) => item.value === value?.category)?.label;

    return {
      type: type,
      category: category
    };
  };

  //=======================||TABLE COLUMNS||========================//

  //---> MAIN TABLE
  const columns = [
    {
      Header: 'Ticket',
      Footer: 'Ticket',
      accessor: 'ticket',
      dataType: 'text',
      filter: 'fuzzyText',
      disableFilters: true,
      disableGroupBy: true
    },
    {
      Header: 'Type',
      Footer: 'Type',
      accessor: 'type',
      dataType: 'text',
      filter: 'fuzzyText',
      disableFilters: true,
      disableGroupBy: true,
      Cell: ({ row }) => {
        return (
          <Typography variant="h6" noWrap color="textPrimary" component="div">
            {findSupportTicketTypeCategory(row?.original)?.type}
          </Typography>
        );
      }
    },
    {
      Header: 'Category',
      Footer: 'Category',
      accessor: 'category',
      dataType: 'text',
      filter: 'fuzzyText',
      disableFilters: true,
      disableGroupBy: true,
      Cell: ({ row }) => {
        return (
          <Typography variant="h6" noWrap color="textPrimary" component="div">
            {findSupportTicketTypeCategory(row?.original)?.category}
          </Typography>
        );
      }
    },
    {
      Header: 'Status',
      Footer: 'Status',
      accessor: 'status',
      dataType: 'text',
      filter: 'fuzzyText',
      disableFilters: true,
      disableGroupBy: true,
      Cell: ({ value }) => {
        return (
          <Stack spacing={1}>
            <ShowStatus value={value ? value : ''} size="small" />
          </Stack>
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
      Cell: ({ row }) => {
        return (
          <>
            <ActionCell
              ellipsis={true}
              row={row}
              isExpandable={false}
              //   setOpen={handleTicketUpdateDialogANDTableCell}
              permissionKey="ticket"
              menuItems={
                [
                  // {
                  //   title: 'Delete',
                  //   icon: <DeleteFilled />,
                  //   handleClick: handleDeleteDialog
                  // }
                ]
              }
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
          title: 'Ticket',
          subheader: 'List of Ticket',
          hasAction: true,
          columns: columns,
          data: subTickets,
          hasSelection: false,
          openDialog: open,
          handleCloseDialog,
          isLoading: subTicketLoading,
          hasSerial: true,
          isServerPagination: false,
          isServerFilter: false,
          isExpandable: true,
          rowHiddenName: 'tickets',
          tableColumnDependency: [categorys, types]
        }}
      />
    </Box>
  );
};

export default SubResellerTicket;
