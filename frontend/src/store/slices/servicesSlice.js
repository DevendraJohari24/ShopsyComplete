import { apiSlice } from './apiSlice';
const SERVICE_URL = '/api/v1/services';

export const servicesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
        query: () => ({
            url: `${SERVICE_URL}/`,
        }),
    }),
  }),
});

export const {
  useLazyGetServicesQuery
} = servicesApiSlice;