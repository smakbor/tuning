/* eslint-disable react-hooks/exhaustive-deps */
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Box, Dialog } from '@mui/material';
import useDialog from 'components/custom/hooks/useDialog';
import ActionCell from 'components/custom/table/ActionCell';
import Table from 'components/custom/table/Table';
import useAuth from 'hooks/useAuth';
import ResellerCollectionDetails from '../collection/CollectionDetails';
import dayjs from 'dayjs';
import { useGetResellerReportQuery, useGetResellersQuery } from 'api/service/reseller.service';
import { useGetEmployeeQuery } from 'api/service/employee.service';

const ResellerCollection = () => {
  //-> DIALOG HOOKS
  const { open, handleDialogOpen, handleDialogClose, drawerOpen, handleDrawerOpen } = useDialog();

  // RESELLER COLLECTION DETAILS DIALOG HANDLER
  const {
    open: collectionDetails,
    handleDialogOpen: resellerCollectionHandleDialogOpen,
    handleDialogClose: resellerCollectionHandleDialogClose
  } = useDialog();

  const { user } = useAuth();

  // ===========================|| RTK HOOKS ||===========================
  // @GET RESELLER REPORT
  const { data, isLoading, refetch, isFetching } = useGetResellerReportQuery(user?.merchant, {
    skip: !user
  });

  // @GET EMPLOYEE
  const { data: userData } = useGetEmployeeQuery();

  // @GET RESELLER
  const { data: resellerData } = useGetResellersQuery();
  console.log({ userData });

  // -> TABLE COLUMNS
  const columns = [
    {
      Header: 'Billing Type',
      Footer: 'Billing Type',
      accessor: 'billingType',
      dataType: 'text',
      disableGroupBy: true,
      aggregate: 'count',
      disableFilters: true
    },
    {
      Header: 'Bill Type',
      Footer: 'Bill Type',
      accessor: 'billType',
      dataType: 'text',
      filter: 'fuzzyText',
      disableFilters: true,
      disableGroupBy: true
    },
    {
      Header: 'Bill',
      Footer: 'Bill',
      accessor: 'amount',
      dataType: 'number',
      filter: 'fuzzyText',
      disableFilters: true,
      disableGroupBy: true
    },
    {
      Header: 'Discount',
      Footer: 'Discount',
      accessor: 'discount',
      dataType: 'number',
      filter: 'fuzzyText',
      disableFilters: true,
      disableGroupBy: true
    },
    {
      Header: 'Collected By',
      Footer: 'Collected By',
      accessor: 'collectedBy',
      dataType: 'text',
      filter: 'fuzzyText',
      disableFilters: true,
      disableGroupBy: true
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
      Header: 'Remarks',
      Footer: 'Remarks',
      accessor: 'remarks',
      dataType: 'text',
      filter: 'fuzzyText',
      disableFilters: true,
      disableGroupBy: true,
      Cell: ({ value }) => {
        return value || 'N/A';
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
              hasEditButton={false}
              row={row}
              isExpandable={false}
              setOpen={handleDialogOpen}
              menuItems={[
                {
                  title: 'Details',
                  icon: <VisibilityOutlinedIcon />,
                  // eslint-disable-next-line react/prop-types
                  handleClick: resellerCollectionHandleDialogOpen
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
        title="Reseller Collection"
        subheader="List of Reseller Collection"
        hasAction={true}
        columns={columns}
        data={data}
        hasSelection={false}
        openDialog={open}
        handleCloseDialog={handleDialogClose}
        drawerOpen={drawerOpen}
        handleDrawerOpen={handleDrawerOpen}
        isLoading={isLoading || isFetching}
        rowHiddenName="resellerCollections"
        hasSerial={true}
        refetch={refetch}
      />

      {/* reseller collection details dialog    */}
      <Dialog open={collectionDetails} onClose={resellerCollectionHandleDialogClose}>
        <ResellerCollectionDetails handleCloseDialog={resellerCollectionHandleDialogClose} />
      </Dialog>
    </Box>
  );
};

export default ResellerCollection;
