import { useSelector } from 'react-redux';

/**
 * This hook is used to get the selected rows data from redux store.
 * @param {string} moduleName - The name of the module.
 * @returns {Array} - The selected rows data.
 */
const useGetReduxSelectedRowsData = (moduleName) => {
  const selectedRowsState = useSelector(({ selectedRows }) => selectedRows);

  if (!moduleName || !selectedRowsState[moduleName]) {
    return [];
  }

  const selectedRows = Object.keys(selectedRowsState?.[moduleName]).reduce((acc, key) => {
    acc.push(...selectedRowsState[moduleName][key]);
    return acc;
  }, []);

  return selectedRows;
};

export default useGetReduxSelectedRowsData;
