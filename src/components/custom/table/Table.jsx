/*before using the table please read the every comment and understand the code
this will help you to understand the code and you can easily modify the code according to your need,

*/

/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';

// material-ui
import { alpha } from '@mui/material/styles';
import { Box, Stack, IconButton, Tooltip, Fade, Badge, Skeleton, Checkbox, Typography, Chip } from '@mui/material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import update from 'immutability-helper';

import { DndProvider } from 'react-dnd';
import { isMobile } from 'react-device-detect';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import _ from 'lodash';

import {
  useColumnOrder,
  useExpanded,
  useFilters,
  useGroupBy,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable
} from 'react-table';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
// mui icons
// import FileDownloadIcon from '@mui/icons-material/FileDownload';

import { DragPreview, HidingSelect, IndeterminateCheckbox, TablePagination, CSVExport } from 'components/third-party/ReactTable';
import { renderFilterTypes, GlobalFilter, DefaultColumnFilter } from 'utils/react-table';

import ShowStatus from './StatusChip';

// assets
import { DownloadOutlined, FileExcelOutlined, FilterOutlined, PlusOutlined, PrinterOutlined } from '@ant-design/icons';
import { useDownloadExcel } from 'react-export-table-to-excel';
import { useExcelPrint } from '../hooks/printHook';
import useDialog from '../hooks/useDialog';
import RowAndColl from './RowAndColl';
import PrintModal from '../alert/PrintModal';
import FilterDrawer from '../filter/FilterDrawer';
import dayjs from 'dayjs';
import { FilterAltOffOutlined, GroupsOutlined, RefreshOutlined } from '@mui/icons-material';
import { useGetTableHiddenRowQuery } from 'api/service/tableRowHidden.service';
import useAuth from 'hooks/useAuth';
import BulkOperation from './BulkOperation';
import { getAllQueryParams } from 'utils/getAllQueryParams';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  clearFrontEndSelectedRows,
  clearReduxSelectedRows,
  setFrontEndSelectedRows,
  setReduxSelectedRows
} from 'store/reducers/selectedRows';
import useGetReduxSelectedRowsData from 'hooks/useGetReduxSelectedRowsData';
import { useForm } from 'react-hook-form';
import LoadingButton from 'components/@extended/LoadingButton';

// ==============================|| RENDERED ROW||==============================
const RenderRow = ({ value, column: { dataType } }) => {
  //this function is used to change the value of the input field

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

// ==============================|| REACT TABLE ||==============================
function ReactTable({
  columns,
  getDataQueryParams,
  data,
  hasSelection,
  hasSerial,
  ExpandedComponent,
  isExpandable,
  addBtnLabel,
  handleAddButton,
  hasColumnHiddenMenu,
  hasPrintMenuBtn,
  totalPage,
  currentPage,
  allDataCount,
  isServerPagination,
  isServerFilter,
  hasFilteredDrawer,
  clientHandleApplyFilterSubmit,
  filterFormData,
  filteredFormId,
  filterDefaultValue,
  filterFormControl: control,
  filterFormHandleSubmit: handleSubmit,
  filterFormReset: reset,
  setTableData,
  isLoading,
  tableColumnDependency,
  rowHiddenName,
  tableRowExpandableData,
  refetch,
  title,
  subheader,
  headerButton,
  bulkOperationActionButtons,
  bulkOperationSuccess,
  endHeaderContent,
  ExtraHeaderButtonIcon,
  extraAddedFieldInHeaderName,
  handlerExtraAddedFieldInHeader
}) {
  const filterTypes = useMemo(() => renderFilterTypes, []);
  //set the default column for the table
  const defaultColumn = useMemo(() => ({ Filter: DefaultColumnFilter, Cell: RenderRow }), []);

  // ============================== HOOKS ==============================
  // -> USE AUTH HOOKS
  const { user } = useAuth();

  // -> GET URL PARAMS FROM HOOK
  const [params, setParams] = useSearchParams();

  // ====================== REDUX HOOKS ======================

  // -> GET REDUX SELECTED ROWS
  const selectedRowsReduxState = useGetReduxSelectedRowsData(rowHiddenName);

  // -> GET DISPATCH
  const dispatch = useDispatch();

  const { page: paramPage, limit: paramLimit, ...restParams } = getAllQueryParams(params);

  // -> RTK QUERY HOOKS
  // @GET TABLE HIDDEN ROW
  const { data: rowHideDataRes, isSuccess: rowColumnHiddenSuccess } = useGetTableHiddenRowQuery(user?.merchant, {
    skip: !user
  });

  // ====================||LOCAL STATES||=====================
  const [pageIndex, setPageIndex] = useState(1);

  // ============||SET THE INITIAL STATE FOR THE TABLE||==============
  const initialState = useMemo(() => {
    const hiddenColumns = rowColumnHiddenSuccess ? rowHideDataRes?.[rowHiddenName] || [] : [];
    const columnOrder = columns.map(({ accessor }) => accessor).filter(Boolean);
    return {
      filters: [],
      hiddenColumns,
      pageSize: paramLimit || 100,
      columnOrder
    };
  }, [rowColumnHiddenSuccess, ...tableColumnDependency]);

  const tableData = useMemo(() => (isLoading ? Array(7).fill({}) : data), [isLoading, data]);

  const tableColumns = useMemo(
    () =>
      isLoading
        ? columns.map((column) => ({
            ...column,
            Cell: <Skeleton />
          }))
        : columns,
    [isLoading, ...tableColumnDependency]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    page,
    prepareRow,
    setColumnOrder,
    gotoPage,
    setPageSize,
    setHiddenColumns,
    allColumns,
    visibleColumns,
    state: { globalFilter, hiddenColumns, pageSize, columnOrder, selectedRowIds, expanded },
    preGlobalFilteredRows,
    setGlobalFilter,
    selectedFlatRows,
    toggleAllRowsSelected
  } = useTable(
    {
      columns: tableColumns,
      data: tableData,
      defaultColumn,
      initialState,
      filterTypes
    },
    useGlobalFilter,
    useFilters,
    useColumnOrder,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        // Make a column for selection
        const modifiedColumns = [
          ...(hasSelection
            ? [
                {
                  title: 'Row Selection',
                  id: 'selection',
                  Header: isLoading ? (
                    <Skeleton variant="text" width={10} />
                  ) : isServerPagination ? (
                    (selectionRow) => SelectionHeaderForServerPagination({ ...selectionRow, rowHiddenName })
                  ) : (
                    SelectionHeader
                  ),
                  // Footer: '#',
                  accessor: 'selection',
                  groupByBoundary: true,
                  Cell: isLoading ? (
                    <Skeleton variant="text" />
                  ) : isServerPagination ? (
                    (selectionRow) => SelectionCellForServerPagination({ ...selectionRow, rowHiddenName })
                  ) : (
                    SelectionCell
                  ),
                  disableSortBy: true,
                  disableFilters: true,
                  disableGroupBy: true,
                  Aggregated: () => null,
                  customWidth: '5%'
                }
              ]
            : []),

          // Make a column for selection
          ...(hasSerial
            ? [
                {
                  id: 'serial',
                  Header: '#',
                  Footer: '#',
                  accessor: (row) => Number(row.id + 1),
                  // eslint-disable-next-line react/prop-types
                  Cell: ({ row }) => (isLoading ? <Skeleton /> : <strong>{Number(row.id) + 1}</strong>),
                  groupByBoundary: true,
                  disableSortBy: true,
                  disableFilters: true,
                  disableGroupBy: true,
                  Aggregated: () => null,
                  customWidth: '5%'
                }
              ]
            : []),
          ...columns
        ];

        return modifiedColumns;
      });
    }
  );

  // drag and drop and reorder the column
  const reorder = (item, newIndex) => {
    const { index: currentIndex } = item;

    let dragRecord = columnOrder[currentIndex];
    if (!columnOrder.includes(item.id)) {
      dragRecord = item.id;
    }

    // update the column order
    setColumnOrder(
      update(columnOrder, {
        $splice: [
          [currentIndex, 1],
          [newIndex, 0, dragRecord]
        ]
      })
    );
  };

  // get the header for the csv file
  let headers = [];

  // set hidden columns
  allColumns.map((item) => {
    if (!hiddenColumns?.includes(item.id) && item.id !== 'selection' && item.id !== 'edit') {
      headers.push({ label: typeof item.Header === 'string' ? item.Header : '#', key: item.id });
    }
    return item;
  });

  //  use Custom Hook Print
  const { excelPrintRef } = useExcelPrint();

  // useDialog destructuring
  const {
    open,
    handleDialogClose,
    handleDialogOpen,
    handleClickPrintMenu,
    printMenu,
    openPrintMenu,
    handleClosePrintMenu,
    drawerOpen,
    handleDrawerOpen,
    handleDrawerClose
  } = useDialog();

  // react-export-to-excel
  const { onDownload } = useDownloadExcel({
    currentTableRef: excelPrintRef.current,
    filename: 'page',
    sheet: 'table-page'
  });

  // render the sub component for expandable table
  const renderRowSubComponent = useCallback(({ row }) => (isExpandable ? <ExpandedComponent data={data[row.id]} /> : ''), [data]);

  // -> HANDLE APPLY FILTER SUBMIT FOR FILTER BY ALL DYNAMIC KEY IN SERVER
  const handleApplyFilterSubmit = async (filterKeyObj) => {
    // create filter object for server filter
    let readyToFilterQueryObj = Object.keys(filterKeyObj).reduce((filterQueryObj, key) => {
      if (filterKeyObj[key]) {
        // if has a date range picker then make date isoString and concat start and end date for date range filter
        if (Array.isArray(filterKeyObj[key])) {
          filterQueryObj = {
            ...filterQueryObj,
            ...{
              [`${key}Start`]: dayjs(filterKeyObj[key][0]).toISOString(),
              [`${key}End`]: dayjs(filterKeyObj[key][1]).toISOString()
            }
          };
        } else {
          filterQueryObj = { ...filterQueryObj, ...{ [key]: filterKeyObj[key] } };
        }
      }
      return filterQueryObj;
    }, []);

    // fetching filter data
    setParams({ page: paramPage, limit: paramLimit, ...readyToFilterQueryObj });
  };

  // -> RESET FILTER DATA
  const handleFilterReset = () => {
    reset(filterDefaultValue || {});

    if (isServerFilter) {
      setParams({
        page: paramPage,
        limit: paramLimit
      });
    } else {
      setTableData(null);
    }
  };

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

  // -> CLEAR BULK ACTION DATA FROM STATE AFTER SUCCESS OPERATION
  useEffect(() => {
    // // setSelectedRows(selectedFlatRows.map((d) => d.original));

    if (bulkOperationSuccess) {
      if (isServerPagination) {
        dispatch(clearReduxSelectedRows(rowHiddenName));
      } else {
        toggleAllRowsSelected(false);
        dispatch(clearFrontEndSelectedRows(rowHiddenName));
      }
    }
  }, [bulkOperationSuccess]);

  return (
    <>
      <Stack spacing={2} justifyContent="center">
        <Stack flexWrap="wrap" alignItems="center" gap={1} direction="row" justifyContent="space-between" p={1}>
          <Stack>
            <Typography variant="h5">{title}</Typography>
            <Typography>
              {subheader} : {allDataCount ? allDataCount : isLoading ? 0 : preGlobalFilteredRows.length || 0}
            </Typography>

            {Boolean(isServerPagination ? selectedRowsReduxState?.length : Object.keys(selectedRowIds).length) && (
              <Chip
                size="small"
                label={`${isServerPagination ? selectedRowsReduxState?.length : Object.keys(selectedRowIds).length} row(s) selected`}
                color="secondary"
              />
            )}
          </Stack>

          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            isLoading={isLoading}
            allDataCount={allDataCount}
            isServerPagination={isServerPagination}
            size="medium"
          />

          <Stack direction="row" flexWrap="wrap" gap={1} alignItems="center">
            {/* IF HEADER HAS AN EXTRA CONTENT */}
            {endHeaderContent && endHeaderContent}

            {/* EXTRA HEADER FIELD */}
            {extraAddedFieldInHeaderName && (
              <Button startIcon={ExtraHeaderButtonIcon} onClick={handlerExtraAddedFieldInHeader} variant="outlined" color="warning">
                {extraAddedFieldInHeaderName}
              </Button>
            )}

            {/* if need header button, you just pass a component where you need */}
            {headerButton && headerButton}

            {/* TABLE COLUMN VISIBILITY MENU */}
            {hasColumnHiddenMenu && (
              <HidingSelect
                rowHiddenName={rowHiddenName}
                hiddenColumns={hiddenColumns}
                setHiddenColumns={setHiddenColumns}
                allColumns={allColumns}
              />
            )}

            {/* REFRESH BUTTON */}
            {Boolean(refetch) && (
              <Tooltip arrow title={isLoading ? 'Refreshing...' : 'Refresh Data'} TransitionComponent={Fade}>
                <LoadingButton
                  onClick={() => {
                    refetch();
                  }}
                  variant="outlined"
                  color="warning"
                  loading={isLoading}
                  sx={{ minWidth: 'auto', padding: '6.5px' }}
                >
                  <RefreshOutlined sx={{ fontSize: '1.2rem' }} />
                </LoadingButton>
              </Tooltip>
            )}

            {/* DOWNLOAD MENU BUTTON */}
            {hasPrintMenuBtn && (
              <Box textAlign="left">
                <Tooltip arrow title="Download Menu" TransitionComponent={Fade}>
                  <Button onClick={handleClickPrintMenu} color="info" variant="outlined" sx={{ minWidth: 'auto', padding: '9px' }}>
                    <DownloadOutlined />
                  </Button>
                </Tooltip>
              </Box>
            )}

            {/* ADD MODULE BUTTON */}
            {addBtnLabel && (
              <Tooltip arrow title={`Add ${title}`}>
                <Button variant="outlined" onClick={handleAddButton} sx={{ minWidth: 'auto', padding: '9px' }}>
                  <PlusOutlined />
                </Button>
              </Tooltip>
            )}

            {/* PRINT MENU */}
            {hasPrintMenuBtn && (
              <Menu
                id="Download-print-menu"
                anchorEl={printMenu}
                open={openPrintMenu}
                onClose={handleClosePrintMenu}
                MenuListProps={{
                  'aria-labelledby': 'basic-button'
                }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center'
                }}
              >
                <MenuItem sx={{ boxShadow: '10px', border: '1px solid #ddd', borderRadius: 2 }}>
                  <Stack direction="row">
                    {/* CSV EXPORT */}
                    <Box textAlign="left">
                      <IconButton sx={{ pt: 1.6 }}>
                        <CSVExport
                          style={{ color: 'warning' }}
                          data={selectedFlatRows.length > 0 ? selectedFlatRows.map((d) => d.original).filter((d) => d !== undefined) : data}
                          filename={'umbrella-table.csv'}
                          headers={headers}
                        />
                      </IconButton>
                    </Box>
                    {/* PRINT BUTTON */}
                    <Box textAlign="left">
                      <Tooltip arrow title="Print" TransitionComponent={Fade}>
                        <IconButton onClick={handleDialogOpen} color="primary" size="large">
                          <PrinterOutlined />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    {/* EXCEL EXPORT  BUTTON */}
                    <Box textAlign="left">
                      <Tooltip arrow title="Excel" TransitionComponent={Fade}>
                        <IconButton onClick={onDownload} color="success" size="large">
                          <FileExcelOutlined />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Stack>
                </MenuItem>
              </Menu>
            )}

            {hasFilteredDrawer && (
              <Box textAlign="end">
                <Tooltip arrow title="Open Filter" TransitionComponent={Fade}>
                  <IconButton onClick={handleDrawerOpen} color="primary" size="medium">
                    <Badge invisible={!_.some(restParams, (value) => Boolean(value))} color="error" variant="dot">
                      <FilterOutlined />
                    </Badge>
                  </IconButton>
                </Tooltip>
                {_.some(restParams, (value) => Boolean(value)) && (
                  <Tooltip arrow title="Reset Filter" TransitionComponent={Fade}>
                    <IconButton onClick={handleFilterReset} color="error" size="medium">
                      <FilterAltOffOutlined fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
            )}
          </Stack>
        </Stack>

        {/* TABLE ROW AND COLUMN SECTION */}
        <RowAndColl
          renderRowSubComponent={renderRowSubComponent}
          getTableProps={getTableProps}
          getTableBodyProps={getTableBodyProps}
          reorder={reorder}
          headerGroups={headerGroups}
          footerGroups={footerGroups}
          page={page}
          prepareRow={prepareRow}
          visibleColumns={visibleColumns}
          isExpandable={isExpandable}
          expanded={expanded}
          alpha={alpha}
          tableRowExpandableData={tableRowExpandableData}
          tableData={tableData}
        />

        {/* DIALOG  FOR PRINT */}
        <PrintModal
          rowHiddenName={rowHiddenName}
          data={data}
          columns={columns}
          open={open}
          handleDialogClose={handleDialogClose}
          excelPrintRef={excelPrintRef}
          isServerPagination={isServerPagination}
        />

        <Box sx={{ p: 2, py: 1 }}>
          <TablePagination
            rows={rows}
            setPageSize={setPageSize}
            pageIndex={pageIndex}
            pageSize={pageSize}
            totalPage={totalPage}
            currentPage={currentPage}
            setPageIndex={setPageIndex}
            gotoPage={gotoPage}
            isServerPagination={isServerPagination}
            getDataQueryParams={getDataQueryParams}
          />
        </Box>

        {/* FILTER DATA BY DRAWER */}
        {hasFilteredDrawer && (
          <FilterDrawer
            {...{
              handleDrawerClose,
              drawerOpen,
              filterFormData,
              formId: filteredFormId,
              column: { xs: 1, sm: 1, md: 2, lg: 2 },
              data: data,
              isServerFilter,
              setTableData,
              handleApplyFilterSubmit: isServerFilter ? handleApplyFilterSubmit : clientHandleApplyFilterSubmit,
              getDataQueryParams: {
                ...getDataQueryParams,
                ...{ limit: pageSize }
              },
              control,
              handleSubmit,
              reset,
              isLoading,
              handleFilterReset
            }}
          ></FilterDrawer>
        )}

        {/* BULK OPERATION COMPONENT */}

        {((bulkOperationActionButtons.length > 0 && selectedFlatRows.length > 0) || selectedRowsReduxState?.length > 0) && (
          <BulkOperation {...{ bulkOperationActionButtons }} />
        )}
      </Stack>
    </>
  );
}

ReactTable.propTypes = {
  hasAction: PropTypes.bool.isRequired,
  hasSelection: PropTypes.bool.isRequired,
  hasSerial: PropTypes.bool.isRequired,
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  ExpandedComponent: PropTypes.elementType,
  isExpandable: PropTypes.bool,
  addBtnLabel: PropTypes.bool,
  handleAddButton: PropTypes.func,
  isLoading: PropTypes.bool,
  actionButtonLoading: PropTypes.bool,
  hasColumnHiddenMenu: PropTypes.bool,
  hasPrintMenuBtn: PropTypes.bool,
  totalPage: PropTypes.number,
  currentPage: PropTypes.number,
  getDataQueryParams: PropTypes.object,
  isServerPagination: PropTypes.bool,
  isServerFilter: PropTypes.bool,
  hasFilteredDrawer: PropTypes.bool,
  clientHandleApplyFilterSubmit: PropTypes.func,
  filterFormData: PropTypes.array,
  filteredFormId: PropTypes.string,
  setTableData: PropTypes.func,
  control: PropTypes.object,
  ExtraHeaderButtonIcon: PropTypes.node,
  tableColumnDependency: PropTypes.array,
  tableRowExpandableData: PropTypes.object,
  refetch: PropTypes.func,
  title: PropTypes.string,
  rowHiddenName: PropTypes.string,
  allDataCount: PropTypes.number,
  bulkOperationActionButtons: PropTypes.array,
  bulkOperationSuccess: PropTypes.bool,
  extraAddedFieldInHeaderName: PropTypes.string,
  handlerExtraAddedFieldInHeader: PropTypes.func
};

// Section Cell and Header
const SelectionCell = ({ row }) => {
  return <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />;
};
SelectionCell.propTypes = {
  row: PropTypes.object
};

const SelectionHeader = ({ getToggleAllPageRowsSelectedProps }) => (
  <IndeterminateCheckbox indeterminate {...getToggleAllPageRowsSelectedProps()} />
);

SelectionHeader.propTypes = {
  getToggleAllPageRowsSelectedProps: PropTypes.func
};

// ====================== SELECTION CELL COMPONENT FOR SERVER PAGINATION ======================
const SelectionCellForServerPagination = ({ row, rowHiddenName }) => {
  // ================= INTERNAL HOOKS =================
  // -> RTK HOOKS
  const selectedRowState = useSelector(({ selectedRows }) => selectedRows);
  const dispatch = useDispatch();

  // REACT ROUTER HOOKS
  const [searchParam] = useSearchParams();
  const page = searchParam.get('page');

  // ================= EXTERNAL HOOKS =================
  // -> LOCAL STATES
  const [isChecked, setIsChecked] = useState(
    selectedRowState?.[rowHiddenName]?.[page]?.some((selectedRow) => selectedRow._id === row.original._id) || false
  );

  const handleSelectionChange = (event) => {
    setIsChecked(event.target.checked);
    if (event.target.checked) {
      dispatch(
        setReduxSelectedRows({
          moduleName: rowHiddenName,
          page,
          data: selectedRowState[rowHiddenName][page] ? [...selectedRowState[rowHiddenName][page], row.original] : [row.original]
        })
      );
    } else {
      dispatch(
        setReduxSelectedRows({
          moduleName: rowHiddenName,
          page,
          data: selectedRowState[rowHiddenName][page].filter((selectedRow) => selectedRow._id !== row.original._id)
        })
      );
    }
  };

  useEffect(() => {
    setIsChecked(selectedRowState?.[rowHiddenName]?.[page]?.some((selectedRow) => selectedRow._id === row.original._id) || false);
  }, [selectedRowState?.[rowHiddenName]?.[page]]);

  return <Checkbox checked={isChecked} onChange={handleSelectionChange} />;
};
SelectionCellForServerPagination.propTypes = {
  row: PropTypes.object,
  rowHiddenName: PropTypes.string
};

// ====================== SELECTION HEADER COMPONENT FOR SERVER PAGINATION ======================
const SelectionHeaderForServerPagination = ({ data, rowHiddenName }) => {
  // ==================== REDUX HOOKS ====================
  const selectedRowState = useSelector(({ selectedRows }) => selectedRows);
  const dispatch = useDispatch();

  // ==================== PACKAGE HOOKS ====================
  const [searchParam] = useSearchParams();
  const page = searchParam.get('page');

  // ===================== FUNCTIONS =====================
  const handleALlSelectionChange = (event) => {
    if (event.target.checked) {
      dispatch(setReduxSelectedRows({ moduleName: rowHiddenName, page, data }));
    } else {
      dispatch(setReduxSelectedRows({ moduleName: rowHiddenName, page, data: [] }));
    }
  };

  return (
    <Checkbox
      checked={data?.length === selectedRowState?.[rowHiddenName]?.[page]?.length}
      indeterminate={data?.length === selectedRowState?.[rowHiddenName]?.[page]?.length}
      onChange={handleALlSelectionChange}
    />
  );
};

SelectionHeaderForServerPagination.propTypes = {
  data: PropTypes.array,
  selectedRows: PropTypes.object,
  rowHiddenName: PropTypes.string
};

/**
 * Table Component
 *
 * @component
 * @example
 *
 * // Example usage of Table
  const ExampleTableComponent = () => {
 * // -> DIALOGUE STATUS HANDLER
  const {
    deleteOpen,
    handleDialogClose,
    handleDeleteDialogOpen,
    handleDeleteDialogClose,
    title,
    drawerOpen,
    handleDrawerClose,
    handleDrawerOpen
  } = useDialog();
 // -> TABLE COLUMNS
  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        Footer: 'ID',
        accessor: 'clientId',
        dataType: 'text',
        disableGroupBy: true,
        aggregate: 'count',
        disableFilters: true
        // Aggregated: ({ value }) => `${value} `
      },
      {
        Header: 'Name',
        Footer: 'Name',
        accessor: 'name',
        dataType: 'text',
        disableGroupBy: true,
        aggregate: 'count',
        disableFilters: true
        // Aggregated: ({ value }) => `${value} `
      },
      {...others props}
  );

  // ====================== FILTER AREA ======================
  // REACT HOOK FORM FROM 
  const { control, handleSubmit, reset,  watch } = useForm();

  const filterFormData = [
    {
      type: 'single-select',
      name: 'zone',
      label: 'Zone',
      placeholder: 'Select Zone',
      visibility: true,
      disable: false,
      id: 'zone',
      options: zones,
      size: 'small'
    },{...others props}
   
  ];

  // TABLE DATA
  const clientListData = useMemo(() => data?.clients || [], [data]);

  return (
    <Box>
      <Table
        title="Clients"
        subheader="List of Clients"
        hasAction={true}
        columns={columns}
        data={clientListData}
        hasSelection={true}
        drawerOpen={drawerOpen}
        handleDrawerOpen={handleDrawerOpen}
        addButtonLabel="Add Client"
        handleAddButton={handleAddButton}
        hasSerial={true}
        currentPage={data?.pagination?.currentPage}
        totalPage={data?.pagination?.totalPage}
        isServerPagination={true}
        getDataQueryParams={getDataQueryParams}
        filterFormData={filterFormData}
        {...{ control, handleSubmit, reset, hasFilteredDrawer: true }}
      ></Table>
      *
 **/

const TableComponent = ({
  title,
  subheader,
  hasAction,
  headerButton,
  columns,
  getDataQueryParams,
  data = [],
  hasSelection,
  hasSerial,
  ExpandedComponent,
  isExpandable = false,
  addButtonLabel,
  handleAddButton,
  isLoading = false,
  actionButtonLoading,
  hasColumnHiddenMenu = true,
  hasPrintMenuBtn = true,
  totalPage,
  currentPage,
  allDataCount,
  isServerPagination = false,
  isServerFilter = false,
  hasFilteredDrawer = false,
  filterFormData,
  filterDefaultValue,
  filterFormControl,
  filterFormHandleSubmit,
  filterFormReset,
  setTableData,
  ExtraHeaderButtonIcon,
  rowHiddenName,
  navigateRoute,
  tableColumnDependency = [],
  tableRowExpandableData,
  refetch,
  endHeaderContent,
  bulkOperationActionButtons = [],
  bulkOperationSuccess,
  clientHandleApplyFilterSubmit,
  extraAddedFieldInHeaderName,
  handlerExtraAddedFieldInHeader
}) => {
  return (
    <MainCard navigateRoute={navigateRoute} content={false}>
      <ScrollX>
        <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
          <ReactTable
            columns={columns}
            data={data}
            hasAction={hasAction}
            hasSelection={hasSelection}
            hasSerial={hasSerial}
            ExpandedComponent={ExpandedComponent}
            isExpandable={isExpandable}
            addBtnLabel={addButtonLabel}
            handleAddButton={handleAddButton}
            isLoading={isLoading}
            actionButtonLoading={actionButtonLoading}
            {...{
              hasColumnHiddenMenu,
              hasPrintMenuBtn,
              totalPage,
              currentPage,
              allDataCount,
              getDataQueryParams,
              isServerPagination,
              ExtraHeaderButtonIcon,
              isServerFilter,
              hasFilteredDrawer,
              setTableData,
              filterFormData,
              filterDefaultValue,
              filterFormControl,
              filterFormHandleSubmit,
              filterFormReset,
              tableColumnDependency,
              rowHiddenName,
              tableRowExpandableData,
              refetch,
              title,
              subheader,
              headerButton,
              endHeaderContent,
              bulkOperationActionButtons,
              clientHandleApplyFilterSubmit,
              bulkOperationSuccess,
              extraAddedFieldInHeaderName,
              handlerExtraAddedFieldInHeader
            }}
          />

          <DragPreview />
        </DndProvider>
      </ScrollX>
    </MainCard>
  );
};

TableComponent.propTypes = {
  title: PropTypes.string.isRequired,
  subheader: PropTypes.string.isRequired,
  hasAction: PropTypes.bool.isRequired,
  columns: PropTypes.array.isRequired,
  data: PropTypes.array,
  ExtraHeaderButtonIcon: PropTypes.node,
  hasSelection: PropTypes.bool.isRequired,
  hasSerial: PropTypes.bool.isRequired,
  children: PropTypes.node,
  ExpandedComponent: PropTypes.elementType,
  isExpandable: PropTypes.bool,
  addButtonLabel: PropTypes.bool,
  handleAddButton: PropTypes.func,
  isLoading: PropTypes.bool,
  actionButtonLoading: PropTypes.bool,
  hasColumnHiddenMenu: PropTypes.bool,
  hasPrintMenuBtn: PropTypes.bool,
  getDataQueryParams: PropTypes.object,
  totalPage: PropTypes.number,
  currentPage: PropTypes.number,
  isServerPagination: PropTypes.bool,
  isServerFilter: PropTypes.bool,
  hasFilteredDrawer: PropTypes.bool,
  setTableData: PropTypes.func,
  filterFormData: PropTypes.array,
  tableColumnDependency: PropTypes.array,
  navigateRoute: PropTypes.object,
  tableRowExpandableData: PropTypes.object,
  refetch: PropTypes.func,
  rowHiddenName: PropTypes.string,
  allDataCount: PropTypes.number,
  endHeaderContent: PropTypes.node,
  bulkOperationActionButtons: PropTypes.array,
  bulkOperationSuccess: PropTypes.bool,
  clientHandleApplyFilterSubmit: PropTypes.func,
  filterDefaultValue: PropTypes.object,
  extraAddedFieldInHeaderName: PropTypes.string,
  handlerExtraAddedFieldInHeader: PropTypes.func
};

export default TableComponent;
