/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
// mui
import { Box, Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

import React, { useEffect, useMemo } from 'react';
import { usePrintComponent } from '../hooks/printHook';
import { renderFilterTypes, DefaultColumnFilter } from 'utils/react-table';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
import { useColumnOrder, useExpanded, useGroupBy, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';
import RowAndColl from '../table/RowAndColl';
import ShowStatus from '../table/StatusChip';
import { PrintHidingSelect } from '../table/PrintHideCell';
import PrintHeader from '../table/PrintHeader';
import { useDispatch } from 'react-redux';
import { setFrontEndSelectedRows } from 'store/reducers/selectedRows';

const RenderRow = ({ value, column: { dataType } }) => {
  //this function is used to change the value of the input field

  // Status Data type checked
  let element;
  switch (dataType) {
    case 'text':
      element = value;
      break;
    case 'select':
      element = ShowStatus(value);
      break;
    case 'progress':
      element = (
        <>
          <div>
            <LinearWithLabel value={value} sx={{ minWidth: 75 }} />
          </div>
        </>
      );
      break;
    default:
      element = <span>{value}</span>;
      break;
  }
  return element;
};

export default function PrintModal({ open, handleDialogClose, columns, data, isServerPagination, excelPrintRef, rowHiddenName }) {
  const dispatch = useDispatch();

  const filterTypes = useMemo(() => renderFilterTypes, []);
  //set the default column for the table
  const defaultColumn = useMemo(() => ({ Filter: DefaultColumnFilter, Cell: RenderRow }), []);
  //set the initial state for the table
  const initialState = useMemo(
    () => ({
      filters: [],
      hiddenColumns: [],
      columnOrder: columns.map((column) => column.accessor).filter((column) => column),
      pageIndex: 0,
      pageSize: data?.length || 10
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    prepareRow,
    setHiddenColumns,
    allColumns,
    visibleColumns,
    state: { hiddenColumns, selectedRowIds, expanded },
    selectedFlatRows
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      initialState
    },
    useColumnOrder,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );

  // get the header for the csv file
  let headers = [];

  //
  allColumns?.map((item) => {
    if (!hiddenColumns?.includes(item.id) && item.id !== 'selection' && item.id !== 'edit') {
      headers.push({ label: typeof item.Header === 'string' ? item.Header : '#', key: item.id });
    }
    return item;
  });

  //  use Custom Hook Print
  const { componentRefPrint, handlePrint } = usePrintComponent();

  // -> SET THE SELECTED ROWS
  useEffect(() => {
    if (!isServerPagination && selectedFlatRows.length > 0) {
      dispatch(
        setFrontEndSelectedRows({
          rowHiddenName,
          data: selectedFlatRows.map((d) => d.original)
        })
      );
    }
  }, [selectedFlatRows]);

  return (
    <Dialog open={open} onClose={handleDialogClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <Box sx={{ p: 1, py: 1.5 }}>
        <DialogTitle id="alert-dialog-title"> Which Column Select for Print</DialogTitle>

        <PrintHidingSelect hiddenColumns={hiddenColumns} setHiddenColumns={setHiddenColumns} allColumns={allColumns} />

        {/* Table row and column section */}

        <Box ref={componentRefPrint} displayPrint="block" display="none" px={7} py={4}>
          <PrintHeader />
          <Box ref={excelPrintRef}>
            <RowAndColl
              getTableProps={getTableProps}
              getTableBodyProps={getTableBodyProps}
              headerGroups={headerGroups}
              footerGroups={footerGroups}
              page={page}
              prepareRow={prepareRow}
              visibleColumns={visibleColumns}
              expanded={expanded}
              isPrint={true}
            />
          </Box>
        </Box>
        <DialogActions>
          <Button color="error" onClick={handleDialogClose}>
            Cancel
          </Button>
          <Button size="small" variant="contained" onClick={handlePrint} autoFocus>
            Print
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
PrintModal.propTypes = {
  open: PropTypes.bool,
  handleDialogClose: PropTypes.func,
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  excelPrintRef: PropTypes.object,
  rowHiddenName: PropTypes.string,
  isServerPagination: PropTypes.bool
};
