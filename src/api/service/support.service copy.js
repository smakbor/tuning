import { api } from 'api/apiConfig';

const supportService = api.injectEndpoints({
  endpoints: (build) => ({
    getSupportStatus: build.query({
      query: () => ({
        url: `/Admin/getStatuses`,
        method: 'GET'
      }),
      transformResponse: (response) => response.data
    })
  })
});

export const { useGetSupportStatusQuery } = supportService;
