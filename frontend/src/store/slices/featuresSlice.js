import { apiSlice } from './apiSlice';
const FEATURE_URL = '/api/v1/features';

const featuresApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFeatures: builder.query({
        query: () => ({
            url: `${FEATURE_URL}/`,
        }),
    }),
  }),
});

export default featuresApiSlice;