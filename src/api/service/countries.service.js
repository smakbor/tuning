import { api } from 'api/apiConfig';

const countriesService = api.injectEndpoints({
  endpoints: (build) => ({
    getCountries: build.query({
      query: () => ({
        url: `countries`,
        method: 'GET'
      }),
      transformResponse: (data) => {
        const result = [];
        for (const country in data) {
          result.push({
            label: data[country],
            value: country
          });
        }
        return result;
      }
    })
  })
});

export const { useGetCountriesQuery } = countriesService;
