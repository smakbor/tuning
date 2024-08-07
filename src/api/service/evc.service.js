import { api } from 'api/apiConfig';

const evcService = api.injectEndpoints({
  endpoints: (build) => ({
    getEvcBalance: build.query({
      query: (evcNumber) => ({
        url: `/Dealer/evc/balance/${evcNumber}`,
        method: 'GET'
      }),
      transformResponse: (response) => response.data
    })
  })
});

export const { useGetEvcBalanceQuery } = evcService;
