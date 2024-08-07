import { api } from 'api/apiConfig';

export const tableRowHidden = api.injectEndpoints({
  endpoints: (build) => ({
    // GET UNITS
    getTableHiddenRow: build.query({
      query: () => {
        return {
          url: `table-column-visibility`,
          method: 'GET'
        };
      },
      transformResponse: (response) => {
        return response?.data;
      }
    }),

    // CREATE UNITS
    setTableHiddenRow: build.mutation({
      query: ({ data }) => {
        return {
          url: `table-column-visibility`,
          method: 'PATCH',
          body: data
        };
      },
      async onQueryStarted({ merchant }, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          dispatch(
            api.util.updateQueryData('getTableHiddenRow', merchant, (draft) => {
              return data;
            })
          );
        } catch (error) {
          console.log(error);
        }
      }
    })
  })
});

export const { useGetTableHiddenRowQuery, useSetTableHiddenRowMutation } = tableRowHidden;
