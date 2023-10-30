import { apiSlice } from './apiSlice';
const COUNTDOWN_URL = '/api/v1/countdowns';

const countdownApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCountdowns: builder.query({
        query: () => ({
            url: `${COUNTDOWN_URL}/`,
        }),
    }),
  }),
});

export default countdownApiSlice;