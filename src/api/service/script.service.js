import { api } from 'api/apiConfig';

const scriptsService = api.injectEndpoints({
  endpoints: (build) => ({
    getScripts: build.query({
      query: () => ({
        url: `/Admin/getScripts`,
        method: 'GET'
      }),
      transformResponse: (response) => response.data
    }),
    handleAutomatisation: build.mutation({
      query: (data) => {
        return {
          url: `/Dealer/automatisation`,
          method: 'POST',
          body: data
        };
      }
    }),

    downloadScript: build.mutation({
      query: (data) => {
        return {
          url: `/Dealer/downloadfile`,
          method: 'POST',
          body: data
        };
      }
    }),
    checkSolution: build.mutation({
      query: (data) => {
        return {
          url: `/Dealer/check-solution`,
          method: 'POST',
          body: data
        };
      }
    })
  })
});

export const { useGetScriptsQuery, useHandleAutomatisationMutation, useDownloadScriptMutation, useCheckSolutionMutation } = scriptsService;
