import { api } from 'api/apiConfig';

const controllerService = api.injectEndpoints({
  endpoints: (build) => ({
    getControllers: build.query({
      query: () => ({
        url: `/Admin/getControllers`,
        method: 'GET'
      }),
      transformResponse: (response) => response.data
    })
  })
});

export const { useGetControllersQuery } = controllerService;
