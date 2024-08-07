/* eslint-disable react-hooks/exhaustive-deps */
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Box, Dialog } from '@mui/material';
import useDialog from 'components/custom/hooks/useDialog';
import ActionCell from 'components/custom/table/ActionCell';
import Table from 'components/custom/table/Table';
import { useGetZoneQuery } from 'api/service/configuration.service';
import useAuth from 'hooks/useAuth';
import CollectionDetails from './CollectionDetails';
import dayjs from 'dayjs';

const Collection = () => {
  // ============================= custom hooks =============================
  // -> DIALOG STATUS HANDLER

  // -> COLLECTION DETAILS DIALOG HANDLER
  const {
    open: collectionDetails,
    handleDialogOpen: collectionHandleDialogOpen,
    handleDialogClose: collectionHandleDialogClose
  } = useDialog();

  const { user } = useAuth();

  // ========================== RTK HOOKS ==========================
  const { data, isLoading } = useGetZoneQuery(user?.merchant, {
    skip: !user
  });

  // TABLE DEPENDENCY
  const columns = [
    {
      Header: 'Name',
      Footer: 'Name',
      accessor: 'name',
      dataType: 'text',
      disableGroupBy: true,
      aggregate: 'count',
      disableFilters: true
    },
    {
      Header: 'Name/PP/IP/Hp',
      Footer: 'Name/PP/IP/Hp',
      accessor: 'name/pp/ip/hp',
      dataType: 'text',
      filter: 'fuzzyText',
      disableFilters: true,
      disableGroupBy: true
    },
    {
      Header: 'Package',
      Footer: 'Package',
      accessor: 'package',
      dataType: 'text',
      filter: 'fuzzyText',
      disableFilters: true,
      disableGroupBy: true
    },
    {
      Header: 'Bill',
      Footer: 'Bill',
      accessor: 'bill',
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
      Header: 'Due',
      Footer: 'Due',
      accessor: 'due',
      dataType: 'number',
      filter: 'fuzzyText',
      disableFilters: true,
      disableGroupBy: true
    },
    {
      Header: 'Agent',
      Footer: 'Agent',
      accessor: 'agent',
      dataType: 'text',
      filter: 'fuzzyText',
      disableFilters: true,
      disableGroupBy: true
    },
    {
      Header: 'Collector',
      Footer: 'Collector',
      accessor: 'collector',
      dataType: 'text',
      filter: 'fuzzyText',
      disableFilters: true,
      disableGroupBy: true
    },
    {
      Header: 'Note',
      Footer: 'Note',
      accessor: 'note',
      dataType: 'text',
      filter: 'fuzzyText',
      disableFilters: true,
      disableGroupBy: true
    },

    {
      Header: 'CreateAt',
      Footer: 'CreateAt',
      accessor: 'createdAt',
      dataType: 'text',
      filter: 'fuzzyText',
      disableFilters: true,
      disableGroupBy: true,
      // eslint-disable-next-line react/prop-types
      Cell: ({ value }) => {
        return <>{dayjs(value).format('lll')}</>;
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
              row={row}
              isExpandable={false}
              setOpen={() => {}}
              menuItems={[
                {
                  title: 'Details',
                  icon: <VisibilityOutlinedIcon />,
                  // eslint-disable-next-line react/prop-types
                  handleClick: collectionHandleDialogOpen
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
        title="Collection"
        subheader="List of Collection"
        hasAction={true}
        columns={columns}
        data={data}
        hasSelection={false}
        isExpandable={true}
        isLoading={isLoading}
        rowHiddenName="collections"
        hasSerial={true}
      />

      {/* collection details dialog */}
      <Dialog open={collectionDetails} onClose={collectionHandleDialogClose}>
        <CollectionDetails handleCloseDialog={collectionHandleDialogClose} />
      </Dialog>
    </Box>
  );
};

export default Collection;
