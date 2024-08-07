import { api } from 'api/apiConfig';

const dashboardService = api.injectEndpoints({
  endpoints: (build) => ({
    monthlyFileDownload: build.query({
      query: ({ dbUserId, year }) => ({
        url: `/Dealer/dashboard/monthly-download/${dbUserId}?year=${year}`,
        method: 'GET'
      }),
      transformResponse: (response) => response.data
    }),
    weeklyFileDownload: build.query({
      query: (dbUserId) => ({
        url: `/Dealer/dashboard/weekly-download/${dbUserId}`,
        method: 'GET'
      }),
      transformResponse: (response) => response.data
    }),
    currentMonthDownloadCount: build.query({
      query: (dbUserId) => ({
        url: `/Dealer/dashboard/current-month-download/${dbUserId}`,
        method: 'GET'
      }),
      transformResponse: (response) => response.data
    }),
    currentYearDownloadCount: build.query({
      query: (dbUserId) => ({
        url: `/Dealer/dashboard/current-year-download/${dbUserId}`,
        method: 'GET'
      }),
      transformResponse: (response) => response.data
    }),
    todayDownloadCount: build.query({
      query: (dbUserId) => ({
        url: `/Dealer/dashboard/today-download/${dbUserId}`,
        method: 'GET'
      }),
      transformResponse: (response) => response.data
    })
  })
});

export const {
  useMonthlyFileDownloadQuery,
  useWeeklyFileDownloadQuery,
  useCurrentMonthDownloadCountQuery,
  useCurrentYearDownloadCountQuery,
  useTodayDownloadCountQuery
} = dashboardService;
