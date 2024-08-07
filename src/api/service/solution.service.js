import { api } from 'api/apiConfig';

const solutionService = api.injectEndpoints({
  endpoints: (build) => ({
    getSolution: build.query({
      query: () => ({
        url: `/Admin/getSolutions`,
        method: 'GET'
      }),
      transformResponse: (response) => response.data
    })
  })
});

export const { useGetSolutionQuery } = solutionService;
