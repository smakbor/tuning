import React, { useState } from 'react';
import { Box, Skeleton, Stack } from '@mui/material';
import Table from 'components/custom/table/Table';
import { useGetCategorysQuery, useGetTicketsQuery, useGetTypesQuery, useUpdateTicketMutation } from 'api/service/support.service';
import MoveUpOutlinedIcon from '@mui/icons-material/MoveUpOutlined';
import useAuth from 'hooks/useAuth';
import useDialog from 'components/custom/hooks/useDialog';
import ActionCell from 'components/custom/table/ActionCell';
import TicketDialog from './TicketDialog';
import dayjs from 'dayjs';
import ShowStatus from 'components/custom/table/StatusChip';
import { useGetClientOptionQueryQuery } from 'api/service/client.service';
import { convertToObject } from 'utils/convert-to-object';
import { useGetEmployeeQuery } from 'api/service/employee.service';
import { convertToLabel } from 'utils/form-label-converter';

const Ticket = () => {
  //===> USER FROM AUTH CONTEXT
  const { user } = useAuth();

  //===> DIALOG HANDLERS FROM DIALOG HOOK
  const { open, handleDialogOpen: handleTicketUpdateDialog, handleDialogClose } = useDialog();

  //========================||RTK  QUERY HOOKS||========================//

  //get employees
  const {
    employeesData,
    employeeObject,
    isLoading: employeeIsLoading
  } = useGetEmployeeQuery(user?.merchant, {
    skip: !user,
    selectFromResult: ({ data, ...rest }) => {
      return { employeesData: convertToLabel(data, 'name', '_id'), employeeObject: convertToObject(data, '_id', ['name']), ...rest };
    }
  });

  //===> @GET SUPPORT TICKETS
  const { data: tickets, isLoading: ticketLoading } = useGetTicketsQuery(user?.merchant, {
    skip: !user
  });

  //===> @GET CLIENTS
  const { clients, isLoading: clientLoading } = useGetClientOptionQueryQuery(user?.merchant, {
    skip: !user,
    selectFromResult: ({ data, ...rest }) => {
      return { clients: convertToObject(data, 'value', ['label']), ...rest };
    }
  });

  //===> @GET SUPPORT TICKET TYPES
  const { types, isLoading: typeLoading } = useGetTypesQuery(user?.merchant, {
    skip: !user,
    selectFromResult: ({ data, ...rest }) => {
      return { types: convertToObject(data, '_id', ['name']), ...rest };
    }
  });

  //===> @GET SUPPORT TICKET CATEGORIES
  const { categories, isLoading: categoryLoading } = useGetCategorysQuery(user?.merchant, {
    skip: !user,
    selectFromResult: ({ data, ...rest }) => {
      return { categories: convertToObject(data, '_id', ['name']), ...rest };
    }
  });

  //========================||MUTATION HOOKS||========================//

  //===> @UPDATE SUPPORT TICKET
  const [updateTicket, { isLoading: ticketUpdateLoading }] = useUpdateTicketMutation();

  //========================||DEFAULT VALUE||========================//
  const DEFAULT_VALUE = {
    status: '',
    ticketType: '',
    ticketCategory: '',
    assignedEmployee: ''
  };

  //========================||LOCAL STATES||========================//

  //---> Default Data For Dialog
  const [defaultData, setDefaultData] = useState(DEFAULT_VALUE);

  //---> Is Update
  const [isUpdate, setIsUpdate] = useState(false);

  //---> Ticket Data
  const [ticketData, setTicketData] = useState({});

  //========================||FUNCTION HANDLERS||========================//

  //---> Dialog Close
  const handleCloseDialog = () => {
    handleDialogClose();
  };

  //---> Table Column Cell
  const handleAssignTicketDialog = (data) => {
    setTicketData({ ...data });
    setDefaultData({ ...DEFAULT_VALUE });
    setIsUpdate(true);
    handleTicketUpdateDialog();
  };

  //---> Ticket Update Data
  const handleTicketUpdate = ({ formValue, setError, reset }) => {
    //---> package update data
    updateTicket({ data: formValue, ticketId: ticketData._id, merchant: ticketData.merchant, handleCloseDialog, setError, reset });
  };

  //=======================||TABLE COLUMNS||========================//

  //---> MAIN TABLE
  const columns = [
    {
      Header: 'Name',
      Footer: 'Name',
      accessor: 'client',
      dataType: 'text',
      filter: 'fuzzyText',
      disableFilters: true,
      disableGroupBy: true,
      Cell: ({ value }) => {
        if (clientLoading) {
          return <Skeleton width={100} variant="text" />;
        }
        return clients && clients[value]?.label;
      }
    },

    {
      Header: 'Type',
      Footer: 'Type',
      accessor: 'type',
      dataType: 'text',
      filter: 'fuzzyText',
      disableFilters: true,
      disableGroupBy: true,
      Cell: ({ value }) => {
        if (typeLoading) {
          return <Skeleton width={100} variant="text" />;
        }
        return types && types[value]?.name;
      }
    },
    {
      Header: 'employee',
      Footer: 'employee',
      accessor: 'employee',
      dataType: 'text',
      filter: 'fuzzyText',
      disableFilters: true,
      disableGroupBy: true,
      Cell: ({ value }) => {
        if (employeeIsLoading) {
          return <Skeleton width={100} variant="text" />;
        }
        return employeeObject && employeeObject[value]?.name;
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
      Cell: ({ value }) => {
        if (categoryLoading) {
          return <Skeleton width={100} variant="text" />;
        }
        return categories && categories[value]?.name;
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
      Header: 'Ticket',
      Footer: 'Ticket',
      accessor: 'ticket',
      dataType: 'text',
      filter: 'fuzzyText',
      disableFilters: true,
      disableGroupBy: true
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
              hasEditButton={false}
              // setOpen={handleAssignTicketDialog}
              permissionKey="ticket"
              menuItems={[
                {
                  title: 'Assign Ticket',
                  icon: <MoveUpOutlinedIcon fontSize="small" />,
                  handleClick: handleAssignTicketDialog
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
          title: 'Ticket',
          subheader: 'List of Ticket',
          hasAction: true,
          columns: columns,
          data: tickets,
          hasSelection: false,
          openDialog: open,
          handleCloseDialog,
          isLoading: ticketLoading,
          hasSerial: true,
          isServerPagination: false,
          isServerFilter: false,
          isExpandable: true,
          rowHiddenName: 'tickets',
          tableColumnDependency: [categories, types, clients, employeeObject]
        }}
      />

      {/* TICKET CREATE AND UPDATE DIALOG */}
      <TicketDialog
        {...{
          isUpdate,
          defaultData,
          ticketData,
          handleCloseDialog,
          handleTicketUpdate,
          isLoading: ticketUpdateLoading,
          openDialog: open,
          formTitle: 'Ticket Assign',
          formId: 'supportTicket',
          formType: 'dialog',
          employeesData
        }}
      />
    </Box>
  );
};

export default Ticket;
