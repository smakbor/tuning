import { api } from 'api/apiConfig';

const profileService = api.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query({
      query: (id) => ({
        url: `/Dealer/profile?id=${id}`,
        method: 'GET',
        credentials: 'include'
      }),
      transformResponse: (response) => response.data
    })
  })
});

export const { useGetProfileQuery } = profileService;
