import { api } from 'api/apiConfig';

/**
 * @param {Promise<object>} queryFulfilled - queryFulfilled object
 * @param {function} dispatch - dispatch function
 * @param {function} successHandler - successHandler function
 * @param {string} endpointName - endpointName string
 * @param {string} cacheKey - cacheKey string
 * @param {function} setError - setError function
 * @returns {void}
 */

const create = async (queryFulfilled, dispatch, successHandler, endpointName, cacheKey, setError, reset) => {
  try {
    const {
      data: { data }
    } = await queryFulfilled;

    dispatch(
      api.util.updateQueryData(endpointName, cacheKey, (draft) => {
        draft?.unshift(data);
        return draft;
      }),
      reset()
    );
    if (typeof successHandler === 'function') {
      successHandler(data);
    }
  } catch ({ error }) {
    errorSetter(error, setError);
  }
};

/**
 * @param {object} queryFulfilled - queryFulfilled object
 * @param {function} dispatch - dispatch function
 * @param {function} successHandler - successHandler function
 * @param {string} deleteEndpointName - deleteEndpointName string
 * @param {string} restoreEndpointName - restoreEndpointName string
 * @param {string} cacheKey - cacheKey string
 * @param {function} setError - setError function
 * @returns {void}
 */

const update = async (queryFulfilled, dispatch, successHandler, endpointName, cacheKey, setError) => {
  try {
    const {
      data: { data }
    } = await queryFulfilled;

    dispatch(
      api.util.updateQueryData(endpointName, cacheKey, (draft) => {
        const index = draft.findIndex((item) => item._id === data._id);
        if (index !== -1) {
          draft[index] = data;
        }
      })
    );
    if (typeof successHandler === 'function') {
      successHandler();
    }
  } catch (error) {
    errorSetter(error, setError);
  }
};

/**
 * @description - this function will delete the data from the delete endpoint and push the data to the restore endpoint
 * @param {object} queryFulfilled - queryFulfilled object
 * @param {function} dispatch - dispatch function
 * @param {function} successHandler - successHandler function
 * @param {string} restoreEndpointName - restoreEndpointName string
 * @param {string} deleteEndpointName - deleteEndpointName string
 * @param {string} cacheKey - cacheKey string
 * @returns {void}
 * @example
 * deleteData(queryFulfilled, dispatch, successHandler, 'getAllRestoreData', 'getAllDeleteData', 'getAllData');
 * **/
const deleteData = async (queryFulfilled, dispatch, successHandler, restoreEndpointName, deleteEndpointName, cacheKey) => {
  try {
    const {
      data: { data }
    } = await queryFulfilled;

    if (data.isTrash) {
      // -> REMOVE DATA FROM DELETE ENDPOINT
      dispatch(
        api.util.updateQueryData(deleteEndpointName, cacheKey, (draft) => {
          return draft.filter((item) => item._id !== data._id);
        })
      );

      // -> PUSH DATA AT RESTORE ENDPOINT
      dispatch(
        api.util.updateQueryData(restoreEndpointName, cacheKey, (draft) => {
          draft.unshift(data);
        })
      );

      // -> COUNT CACHE UPDATE
      dispatch(
        api.util.updateQueryData('getAllTrashDataCount', cacheKey, (draft) => {
          const isMatchCount = restoreEndpointName.slice(3, restoreEndpointName.length - 5).toLowerCase();
          Object.keys(draft).forEach((key) => {
            if (isMatchCount === key.toLowerCase()) {
              draft[key] = draft[key] + 1;
            }
          });
        })
      );
    } else {
      // -> REMOVE DATA FROM RESTORE ENDPOINT
      dispatch(
        api.util.updateQueryData(restoreEndpointName, cacheKey, (draft) => {
          return draft.filter((item) => item._id !== data._id);
        })
      );

      // -> PUSH DATA AT DELETE ENDPOINT
      dispatch(
        api.util.updateQueryData(deleteEndpointName, cacheKey, (draft) => {
          draft.unshift(data);
        })
      );

      // -> COUNT CACHE UPDATE
      dispatch(
        api.util.updateQueryData('getAllTrashDataCount', cacheKey, (draft) => {
          const isMatchCount = restoreEndpointName.slice(3, restoreEndpointName.length - 5).toLowerCase();
          Object.keys(draft).forEach((key) => {
            if (isMatchCount === key.toLowerCase()) {
              draft[key] = draft[key] - 1;
            }
          });
        })
      );
    }

    if (typeof successHandler === 'function') {
      successHandler(data);
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * @param desc - this function will override the existing cache
 * @param {Promise<object>} queryFulfilled - queryFulfilled object
 * @param {function} dispatch - dispatch function
 * @param {function} successHandler - successHandler function
 * @param {string} endpointName - endpointName string
 * @param {string} cacheKey - cacheKey string
 * @returns {void}
 */

// this function will override the existing cache
const get = async (queryFulfilled, dispatch, successHandler, endpointName, cacheKey) => {
  try {
    const {
      data: { data }
    } = await queryFulfilled;
    dispatch(
      api.util.updateQueryData(endpointName, cacheKey, (draft) => {
        draft.concat(data);
      })
    );
    if (typeof successHandler === 'function') {
      successHandler(data);
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * @param {object} error - error object
 * @param {function} setError - setError function
 * @returns {void}
 */

export const errorSetter = (error, setError) => {
  const data = error?.data?.data;
  if (Array.isArray(data) && typeof setError === 'function') {
    data.forEach((item) =>
      setError(item.field, {
        type: 'manual',
        message: item.message
      })
    );
  }
};

// @BULK TRANSFER CLIENT CASH UPDATE UTILS
export const bulkClientTransferCashUpdate = (draft, res) => {
  let totalClient = draft.pagination.allDataCount;
  const filterClients = draft?.clients?.reduce((acc, curr) => {
    if (curr) {
      const clientData = res?.transferredClient?.find((item) => item._id === curr?._id);
      if (!clientData) {
        acc.push({ ...curr });
      }
      if (clientData) {
        totalClient -= 1;
      }
    }
    return acc;
  }, []);
  return { filterClients, totalClient };
};

export default {
  create,
  update,
  deleteData,
  get
};
