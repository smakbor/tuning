import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from './baseURL';

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      const token = window.localStorage.getItem('accessToken');
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    }
    // credentials: "include",
    // mode: "cors",
  }),
  endpoints: () => ({})
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
