import { apiSlice } from './apiSlice';
const SLIDER_URL = '/api/v1/sliders';

export const slidersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSliders: builder.query({
        query: () => ({
            url: `${SLIDER_URL}/`,
        }),
    }),
  }),
});

export const {
  useLazyGetSlidersQuery
} = slidersApiSlice;