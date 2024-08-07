import { DownOutlined, GroupOutlined, RightOutlined, UngroupOutlined } from '@ant-design/icons';
import { Stack, Table, TableBody, TableCell, TableFooter, TableHead, TableRow, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { DraggableHeader, EmptyTable, HeaderSort } from 'components/third-party/ReactTable';
import React, { Fragment } from 'react';
import { usePrintComponent } from '../hooks/printHook';
import PropTypes from 'prop-types';

const RowAndColl = ({
  renderRowSubComponent,
  getTableProps,
  headerGroups,
  reorder,
  footerGroups,
  page,
  prepareRow,
  visibleColumns,
  getTableBodyProps,
  isExpandable,
  expanded,
  alpha,
  tableRowExpandableData,
  isPrint = false,
  tableData = []
}) => {
  //  use Custom Hook Print
  const { componentRefPrint } = usePrintComponent();
  const theme = useTheme();

  return (
    <Box ref={componentRefPrint} sx={{ width: '100%', overflowX: 'auto', display: 'block', height: tableData.length > 8 ? 600 : 600 }}>
      <Table {...getTableProps()} stickyHeader>
        <TableHead sx={{ borderTopWidth: 2 }}>
          {headerGroups?.map((headerGroup, i) => (
            <TableRow key={i} {...headerGroup.getHeaderGroupProps()} sx={{ ...(isPrint && { backgroundColor: '#fff' }) }}>
              {headerGroup.headers.map((column, index) => {
                const groupIcon = column.isGrouped ? <UngroupOutlined /> : <GroupOutlined />;
                return (
                  <TableCell
                    key={`root-billing-${index}`}
                    {...column.getHeaderProps([{ className: column.className }])}
                    sx={{
                      ...(column.customWidth && { width: column.customWidth }),
                      position: 'sticky !important'
                    }}
                  >
                    <DraggableHeader reorder={reorder} key={column.id} column={column} index={index}>
                      <Stack
                        direction="row"
                        spacing={1.15}
                        alignItems="center"
                        sx={{ display: 'inline-flex', ...(isPrint && { color: '#000' }) }}
                      >
                        {column.canGroupBy ? (
                          <Box
                            sx={{
                              color: column.isGrouped ? 'error.main' : 'primary.main',
                              fontSize: '1rem'
                            }}
                            {...column.getGroupByToggleProps()}
                          >
                            {groupIcon}
                          </Box>
                        ) : null}
                        <HeaderSort column={column} sort />
                      </Stack>
                    </DraggableHeader>
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableHead>

        {/* striped table -> add class 'striped' */}
        <TableBody {...getTableBodyProps()} className="striped">
          {headerGroups.map((group, i) => (
            <TableRow key={i} {...group.getHeaderGroupProps()}>
              {group.headers.map((column, index) => (
                <TableCell
                  key={index}
                  sx={{ ...(isPrint && { backgroundColor: '#fff', color: '#000' }) }}
                  {...column.getHeaderProps([{ className: column.className }])}
                >
                  {column.canFilter ? column.render('Filter') : null}
                </TableCell>
              ))}
            </TableRow>
          ))}
          {page.length > 0 ? (
            page.map((row, i) => {
              prepareRow(row);
              const rowProps = row.getRowProps();
              return (
                <Fragment key={i}>
                  <TableRow
                    key={i}
                    {...row.getRowProps()}
                    sx={{ cursor: 'pointer', bgcolor: row.isSelected ? alpha(theme.palette.primary.lighter, 0.35) : 'inherit' }}
                  >
                    {row.cells.map((cell, index) => {
                      let bgcolor = 'inherit';
                      if (cell.isGrouped) bgcolor = 'success.lighter';
                      if (cell.isAggregated) bgcolor = 'warning.lighter';
                      if (cell.isPlaceholder) bgcolor = 'error.lighter';
                      if (cell.isPlaceholder) bgcolor = 'error.lighter';
                      if (row.isSelected) bgcolor = alpha(theme.palette.primary.lighter, 0.35);
                      const collapseIcon = row.isExpanded ? <DownOutlined /> : <RightOutlined />;

                      return (
                        <TableCell
                          key={index}
                          {...cell.getCellProps([{ className: cell.column.className }])}
                          sx={{ bgcolor, ...(isPrint && { backgroundColor: '#fff', color: '#000' }) }}
                        >
                          {cell.isGrouped ? (
                            <Stack direction="row" spacing={1} alignItems="center" sx={{ display: 'inline-flex' }}>
                              <Box
                                sx={{ pr: 1.25, fontSize: '0.75rem', color: 'text.secondary' }}
                                onClick={(e) => {
                                  row.toggleRowExpanded();
                                  e.stopPropagation();
                                }}
                              >
                                {collapseIcon}
                              </Box>
                              {cell.render('Cell')} ({row.subRows.length})
                            </Stack>
                          ) : cell.isAggregated ? (
                            cell.render('Aggregated')
                          ) : cell.isPlaceholder ? null : (
                            cell.render('Cell')
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                  {tableRowExpandableData?._id === row?.original._id
                    ? isExpandable && row.isExpanded && renderRowSubComponent({ row, rowProps, visibleColumns, expanded })
                    : (row.isExpanded = undefined)}
                </Fragment>
              );
            })
          ) : (
            <EmptyTable msg="No Data" colSpan={visibleColumns?.length} />
          )}
        </TableBody>

        {/* footer table */}
        {/* {!isPrint && (
          <TableFooter sx={{ borderBottomWidth: 2 }}>
            {footerGroups.map((group, i) => (
              <TableRow key={i} {...group.getFooterGroupProps()}>
                {group.headers.map((column, index) => (
                  <TableCell
                    sx={{ ...(isPrint && { backgroundColor: '#fff', color: '#000' }) }}
                    key={index}
                    {...column.getFooterProps([{ className: column.className }])}
                  >
                    {column.render('Footer')}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableFooter>
        )} */}
      </Table>
    </Box>
  );
};

export default RowAndColl;

RowAndColl.propTypes = {
  renderRowSubComponent: PropTypes.func,
  getTableProps: PropTypes.func,
  getTableBodyProps: PropTypes.func,
  reorder: PropTypes.func,
  prepareRow: PropTypes.func,
  page: PropTypes.array,
  headerGroups: PropTypes.array,
  footerGroups: PropTypes.array,
  visibleColumns: PropTypes.array,
  alpha: PropTypes.func,
  isExpandable: PropTypes.bool,
  expanded: PropTypes.object,
  tableRowExpandableData: PropTypes.object,
  isPrint: PropTypes.bool,
  tableData: PropTypes.array
};
