import { Box, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import Table from 'components/custom/table/Table';
import {
  useCreateResellerTicketMutation,
  useGetCategorysQuery,
  useGetResellerTicketsQuery,
  useGetSubResellerTicketsQuery,
  useGetTypesQuery,
  useUpdateResellerTicketMutation
} from 'api/service/support.service';
import useAuth from 'hooks/useAuth';
import useDialog from 'components/custom/hooks/useDialog';
import ShowStatus from 'components/custom/table/StatusChip';
import dayjs from 'dayjs';
import ResellerTicketDialog from './ResellerTicketDialog';
import * as yup from 'yup';
import { convertToLabel } from 'utils/form-label-converter';
import ActionCell from 'components/custom/table/ActionCell';
import { useGetResellersQuery } from 'api/service/reseller.service';
import { convertToObject } from 'utils/convert-to-object';

const ResellerTicket = () => {
  //===> USER FROM AUTH CONTEXT
  const { user } = useAuth();

  //===> DIALOG HANDLERS FROM DIALOG HOOK
  const {
    open,
    title,
    handleDialogOpen: handleTicketCreateDialog,
    handleDialogOpen: handleTicketUpdateDialog,
    handleDialogClose,
    deleteOpen,
    handleDeleteDialogOpen,
    handleDeleteDialogClose
  } = useDialog();

  //========================||QUIRY HOOKS||========================//

  //===> @GET RESELLER SUPPPORT TICKETS
  const { data: tickets, isLoading: ticketLoading } = useGetResellerTicketsQuery(user?.merchant, {
    skip: !user
  });

  //===> @GET RESELLER SUPPPORT TICKETS
  const { data: subTickets, isLoading: subTicketLoading } = useGetSubResellerTicketsQuery(user?.merchant, {
    skip: !user
  });

  //===> @GET RESELLERS
  const { resellerDataAsObject } = useGetResellersQuery(user?.merchant, {
    skip: !user,
    selectFromResult: ({ data, ...rest }) => {
      return { resellerDataAsObject: convertToObject(data, '_id', ['name']), data, ...rest };
    }
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

  //========================||MUTATION HOOKS||========================//

  //===> @CREATE RESELLER SUPPORT TICKET
  const [createTicket, { isLoading: ticketCreateLoading }] = useCreateResellerTicketMutation();

  //===> @UPDATE RESELLER SUPPORT TICKET
  const [updateTicket, { isLoading: ticketUpdateLoading }] = useUpdateResellerTicketMutation();

  //========================||DEFAULT VALUE||========================//
  const DEFAULT_VALUE = {
    ticket: '',
    type: '',
    category: '',
    status: ''
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

  //---> User Bulletin Create Dialog
  const handleAddButton = () => {
    setDefaultData(DEFAULT_VALUE);
    setIsUpdate(false);
    handleTicketCreateDialog();
  };

  //---> Table Column Cell
  const handleTicketUpdateDialogANDTableCell = (data) => {
    setTicketData(data);
    setDefaultData({ ticket: data.ticket, type: data.type, category: data.category, status: data.status });
    setIsUpdate(true);
    handleTicketUpdateDialog();
  };

  //---> Reseller Support Ticket Create
  const handleTicketCreate = ({ formValue, setError, reset }) => {
    const data = {
      ...formValue,
      supportGetter: user?.role,
      status: 'PENDING'
    };

    //---> ticket create data
    createTicket({ data, handleCloseDialog, setError, reset });
  };

  //---> Reseller Support Ticket Update
  const handleTicketUpdate = ({ formValue, setError, reset }) => {
    //---> ticket update data
    updateTicket({ data: formValue, ticketId: ticketData._id, reseller: ticketData.reseller, handleCloseDialog, setError, reset });
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
    user.role === 'RESELLER' && {
      Header: 'Name',
      Footer: 'Name',
      accessor: 'reseller',
      dataType: 'text',
      filter: 'fuzzyText',
      disableFilters: true,
      disableGroupBy: true,
      Cell: ({ value }) => {
        return resellerDataAsObject && resellerDataAsObject[value]?.name;
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
              setOpen={handleTicketUpdateDialogANDTableCell}
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
  ].filter((item) => item);

  //=======================||FORM VALIDATION SCHEMA||========================//

  //---> User Ticket Create
  const CreateTicketValidationSchema = yup.object({
    ticket: yup.string().required('Ticket is required field'),
    type: yup.string().required('Type is required field'),
    category: yup.string().required('Category is required field')
  });

  //=======================||FORM DATA||========================//

  //---> User Ticket Create
  const CreateTicketFormData = [
    {
      type: 'textarea',
      name: 'ticket',
      label: 'Title',
      placeholder: 'Title',
      required: true,
      size: 'large',
      visibility: true,
      disabled: false,
      id: 'ticket'
    },
    {
      type: 'single-select',
      name: 'type',
      label: 'Ticket Type',
      required: true,
      size: 'large',
      visibility: true,
      disabled: false,
      id: 'type',
      options: types || []
    },
    {
      type: 'single-select',
      name: 'category',
      label: 'Ticket Category',
      required: true,
      size: 'large',
      visibility: true,
      disabled: false,
      id: 'category',
      options: categorys || []
    },
    {
      type: 'single-select',
      name: 'status',
      label: 'Ticket Status',
      required: true,
      size: 'large',
      visibility: user.role === 'MERCHANT',
      disabled: false,
      id: 'status',
      options: [
        {
          label: 'Pending',
          value: 'PENDING'
        },
        {
          label: 'Processing',
          value: 'PROCESSING'
        },
        {
          label: 'Resolve',
          value: 'RESOLVE'
        },
        {
          label: 'Development',
          value: 'DEVELOPMENT'
        },
        {
          label: 'onHold',
          value: 'ONHOLD'
        }
      ]
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
          data: ['MERCHANT', 'RESELLER'].includes(user.role) ? tickets : subTickets,
          hasSelection: false,
          addButtonLabel: true,
          handleAddButton,
          openDialog: open,
          handleCloseDialog,
          isLoading: ['MERCHANT', 'RESELLER'].includes(user.role) ? ticketLoading : subTicketLoading,
          hasSerial: true,
          isServerPagination: false,
          isServerFilter: false,
          isExpandable: true,
          rowHiddenName: 'tickets',
          tableColumnDependency: [categorys, types]
        }}
      />

      {/* RESELLER SUPPORT TICKET CREATE AND UPDATE DIALOG */}
      <ResellerTicketDialog
        {...{
          isUpdate,
          defaultData,
          handleCloseDialog,
          handleTicketCreate,
          handleTicketUpdate,
          isLoading: ticketCreateLoading || ticketUpdateLoading,
          formData: CreateTicketFormData,
          validationSchema: CreateTicketValidationSchema,
          openDialog: open,
          formTitle: isUpdate ? 'Update Ticket' : 'Create Ticket',
          formId: 'supportTcket',
          formType: 'dialog'
        }}
      />
    </Box>
  );
};

export default ResellerTicket;
