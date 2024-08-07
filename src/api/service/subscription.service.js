import { api } from 'api/apiConfig';

const subscriptionService = api.injectEndpoints({
  endpoints: (build) => ({
    getPrices: build.query({
      query: () => ({
        url: `/Admin/getPricing`,
        method: 'GET'
      }),
      transformResponse: (response) => response.data
    }),
    subscribe: build.mutation({
      query: ({ dbUserId, paymentMethod }) => ({
        url: `/Dealer/annualsubscription?userId=${dbUserId}&paymentMethod=${paymentMethod}`,
        method: 'GET'
      })
    }),
    buyCredits: build.mutation({
      query: ({ dbUserId, credits, paymentMethod }) => ({
        url: `/Dealer/buyCredits?userId=${dbUserId}&credits=${credits}&paymentMethod=${paymentMethod}`,
        method: 'GET'
      })
    }),
    getCredits: build.query({
      query: (dbUserId) => ({
        url: `/Dealer/getCredits?userId=${dbUserId}`,
        method: 'GET'
      }),
      transformResponse: (response) => response.data
    }),
    getSubscription: build.query({
      query: (dbUserId) => ({
        url: `/Dealer/subCredits?userId=${dbUserId}`,
        method: 'GET'
      }),
      transformResponse: (response) => response.data
    }),
    //evc credit
    buyEvcCredits: build.mutation({
      query: ({ dbUserId, evcCredits, paymentMethod }) => ({
        url: `/Dealer/buy-evc-credits?userId=${dbUserId}&evcCredits=${evcCredits}&paymentMethod=${paymentMethod}`,
        method: 'GET'
      })
    })
  })
});

export const {
  useGetPricesQuery,
  useSubscribeMutation,
  useBuyCreditsMutation,
  useGetCreditsQuery,
  useGetSubscriptionQuery,
  useBuyEvcCreditsMutation
} = subscriptionService;
