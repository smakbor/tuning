// import React, { useMemo } from 'react';
// import Table from './Table';
// import { Box, Grid, TextField, Typography } from '@mui/material';
// import { NumericFormat } from 'react-number-format';
// import makeData from 'data/react-table';
// import { NumberRangeColumnFilter, SelectColumnFilter, SliderColumnFilter, filterGreaterThan, roundedMedian } from 'utils/react-table';
// import ActionCell from './ActionCell';
// import { DeleteFilled } from '@ant-design/icons';
// import FormComponent from '../Form';
// import CustomerView from 'sections/apps/customer/CustomerView';
// import DeletionAlert from '../alert/DeleteAlert';
// import useDialogue from '../hooks/useDialogue';
// import FilterDrawer from '../filter/FilterDrawer';

// function RenderTable() {
//   const [selectedRows, setSelectedRows] = React.useState([]);

//   //dialogue status handler
//   const {
//     open,
//     deleteOpen,
//     handleDialogOpen,
//     handleDialogClose,
//     handleDeleteDialogueOpen,
//     handleDeleteDialogueClose,
//     title,
//     drawerOpen,
//     handleDrawerClose,
//     handleDrawerOpen
//   } = useDialogue();

//   const columns = useMemo(
//     () => [
//       {
//         Header: '#',
//         Footer: '#',
//         accessor: 'id',
//         className: 'cell-center',
//         disableFilters: true,
//         disableGroupBy: true
//       },

//       {
//         Header: 'First Name',
//         Footer: 'First Name',
//         accessor: 'firstName',
//         dataType: 'text',
//         disableGroupBy: true,
//         aggregate: 'count',
//         disableFilters: true,
//         Aggregated: ({ value }) => `${value} Person`
//       },
//       {
//         Header: 'Last Name',
//         Footer: 'Last Name',
//         accessor: 'lastName',
//         dataType: 'text',
//         filter: 'fuzzyText',
//         disableFilters: true,
//         disableGroupBy: true
//       },

//       {
//         Header: 'Email',
//         Footer: 'Email',
//         accessor: 'email',
//         dataType: 'text',
//         disableFilters: true,
//         disableGroupBy: true
//       },
//       {
//         Header: 'Age',
//         Footer: 'Age',
//         accessor: 'age',
//         dataType: 'text',
//         className: 'cell-right',
//         Filter: SliderColumnFilter,
//         filter: 'equals',
//         aggregate: 'average',
//         Aggregated: ({ value }) => `${Math.round(value * 100) / 100} (avg)`,
//         disableFilters: true
//       },
//       {
//         Header: 'Role',
//         Footer: 'Role',
//         dataType: 'text',
//         accessor: 'role',
//         disableGroupBy: true,
//         disableFilters: true
//       },
//       {
//         Header: 'Contact',
//         dataType: 'text',
//         Footer: 'Contact',
//         accessor: 'contact',
//         disableGroupBy: true,
//         disableFilters: true
//       },

//       {
//         Header: 'Visits',
//         accessor: 'visits',
//         dataType: 'text',
//         className: 'cell-right',
//         Filter: NumberRangeColumnFilter,
//         filter: 'between',
//         disableGroupBy: true,
//         disableFilters: true,
//         aggregate: 'sum',
//         Aggregated: ({ value }) => `${value} (total)`,
//         Footer: (info) => {
//           const { rows } = info;
//           // only calculate total visits if rows change
//           const total = useMemo(() => rows.reduce((sum, row) => row.values.visits + sum, 0), [rows]);

//           return (
//             <Typography variant="subtitle1">
//               <NumericFormat value={total} displayType="text" thousandSeparator />
//             </Typography>
//           );
//         }
//       },
//       {
//         Header: 'Status',
//         Footer: 'Status',
//         accessor: 'status',
//         dataType: 'select',
//         Filter: SelectColumnFilter,
//         filter: 'includes',
//         disableFilters: true
//       },
//       {
//         Header: 'Profile Progress',
//         Footer: 'Profile Progress',
//         accessor: 'progress',
//         Filter: SliderColumnFilter,
//         dataType: 'progress',
//         filter: filterGreaterThan,
//         disableGroupBy: true,
//         aggregate: roundedMedian,
//         Aggregated: ({ value }) => `${value} (med)`,
//         disableFilters: true
//       },
//       {
//         id: 'action',
//         Footer: 'Actions',
//         disableSortBy: true,
//         disableFilters: true,
//         disableGroupBy: true,
//         Aggregated: () => null,
//         Header: 'Actions',
//         className: 'cell-center',
//         Cell: ({ row }) => {
//           return (
//             <ActionCell
//               ellipsis={true}
//               row={row}
//               isExpandable={true}
//               setOpen={handleDialogOpen}
//               menuItems={[
//                 {
//                   title: 'Delete',
//                   icon: <DeleteFilled />,
//                   handleClick: handleDeleteDialogueOpen
//                 }
//               ]}
//             />
//           );
//         }
//       }
//     ],
//     []
//   );

//   const data = useMemo(() => makeData(200), []);

//   return (
//     <Box>
//       <Table
//         title="Customer List"
//         subheader="List of all the customers"
//         hasAction={true}
//         columns={columns}
//         data={data}
//         hasSelection={true}
//         openDialogue={open}
//         handleCloseDialogue={handleDialogClose}
//         isExpandable={true}
//         ExpandedComponent={CustomerView}
//         setSelectedRows={setSelectedRows}
//         drawerOpen={drawerOpen}
//         handleDrawerOpen={handleDrawerOpen}
//         addButtonLabel="Add Customer"
//         handleAddButton={() => {}}
//       >
//         <FormComponent />
//       </Table>
//       <DeletionAlert title={title} open={deleteOpen} handleClose={handleDeleteDialogueClose} />
//       <FilterDrawer drawerOpen={drawerOpen} handleDrawerClose={handleDrawerClose}>
//         <Grid item>
//           <TextField fullWidth label="First Name" variant="outlined" />
//         </Grid>
//         <Grid item>
//           <TextField fullWidth label="First Name" variant="outlined" />
//         </Grid>
//         <Grid item>
//           <TextField fullWidth label="First Name" variant="outlined" />
//         </Grid>
//       </FilterDrawer>
//     </Box>
//   );
// }

// export default RenderTable;
