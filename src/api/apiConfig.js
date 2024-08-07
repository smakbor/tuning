// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from './baseURL';
//error handler

/**
 * Log a warning and show a toast!
 */

// initialize an empty api service that we'll inject endpoints into later as needed
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    mode: 'cors',

    prepareHeaders(headers, { getState }) {
      const token = getState().auth.token;
      if (token) headers.set('Authorization', 'Bearer ' + token);
      headers.set('device', 'WEB');
      return headers;
    }
  }),
  endpoints: () => ({})
});
