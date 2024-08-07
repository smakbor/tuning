import { api } from 'api/apiConfig';
import dispatcher from 'utils/dispatcher/dispatcher';

export const incomeType = api.injectEndpoints({
  endpoints: (build) => ({
    // GET INCOME TYPE
    getIncomeType: build.query({
      query: () => {
        return {
          url: `incomes/income-types`,
          method: 'GET'
        };
      },
      transformResponse: (response) => {
        return response?.data;
      }
    }),

    // GET INCOME TYPE TRASH
    getIncomeTypeTrash: build.query({
      query: () => {
        return {
          url: `/trash/income-type`,
          method: 'GET'
        };
      },
      transformResponse: (response) => {
        return response?.data;
      }
    }),

    // create income type
    createIncomeType: build.mutation({
      query: ({ data }) => {
        return {
          url: `incomes/income-types`,
          method: 'POST',
          body: data
        };
      },
      async onQueryStarted({ data, handleCloseDialog, setError, reset }, { dispatch, queryFulfilled }) {
        dispatcher.create(queryFulfilled, dispatch, handleCloseDialog, 'getIncomeType', data.merchant, setError, reset);
      }
    }),

    // update income type
    updateIncomeType: build.mutation({
      query: ({ data: { _id, ...data } }) => {
        return {
          url: `incomes/income-types/${_id}`,
          method: 'PATCH',
          body: data
        };
      },
      async onQueryStarted({ handleCloseDialog, setError, data }, { queryFulfilled, dispatch }) {
        dispatcher.update(queryFulfilled, dispatch, handleCloseDialog, 'getIncomeType', data.merchant, setError);
      }
    }),

    // DELETE INCOME TYPE
    deleteOrRestoreIncomeType: build.mutation({
      query: ({ incomeTypeId, isTrash }) => {
        return {
          url: `incomes/income-type/delete/${incomeTypeId}?isTrash=${isTrash}`,
          method: 'PATCH'
        };
      },
      async onQueryStarted({ handleDeleteSuccess, merchant }, { queryFulfilled, dispatch }) {
        dispatcher.deleteData(queryFulfilled, dispatch, handleDeleteSuccess, 'getIncomeTypeTrash', 'getIncomeType', merchant);
      }
    })
  })
});

export const {
  useGetIncomeTypeQuery,
  useGetIncomeTypeTrashQuery,
  useCreateIncomeTypeMutation,
  useUpdateIncomeTypeMutation,
  useDeleteOrRestoreIncomeTypeMutation
} = incomeType;
