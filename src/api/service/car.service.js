import { api } from 'api/apiConfig';

const carService = api.injectEndpoints({
  endpoints: (build) => ({
    getCars: build.query({
      query: () => ({
        url: `/Admin/getCars`,
        method: 'GET'
      }),
      transformResponse: (response) => response.data
    })
  })
});

export const { useGetCarsQuery } = carService;
