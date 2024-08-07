import { api } from 'api/apiConfig';

const scriptsService = api.injectEndpoints({
  endpoints: (build) => ({
    getRequests: build.query({
      query: (id) => ({
        url: `/Dealer/myrequests?id=${id}`,
        method: 'GET'
      }),
      transformResponse: (response) => response.data
    }),
    requestSolution: build.mutation({
      query: (data) => {
        return {
          url: `/Dealer/requests`,
          method: 'POST',
          body: data
        };
      }
    })
  })
});

export const { useGetRequestsQuery, useRequestSolutionMutation } = scriptsService;
