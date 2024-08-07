import { useSelector, shallowEqual } from 'react-redux';
import { useMemo } from 'react';
/**
 * @param {string} rowHiddenName - The name of the row.
 * @returns {Array} - The selected rows data.
 * */
const useGetReduxFrontEndSelectedRows = (rowHiddenName) => {
  // MEMOIZE rowHiddenName TO ENSURE IT DOESN'T CHANGE ON EACH RENDER
  const memoizedRowHiddenName = useMemo(() => rowHiddenName, [rowHiddenName]);

  // USE shallowEqual TO AVOID UNNECESSARY RE-RENDERS
  const selectedRows = useSelector(({ selectedRows }) => selectedRows.frontEndSelectedRows?.[memoizedRowHiddenName], shallowEqual);

  return selectedRows;
};

export default useGetReduxFrontEndSelectedRows;
