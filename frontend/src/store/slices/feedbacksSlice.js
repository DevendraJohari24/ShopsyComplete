import { apiSlice } from './apiSlice';
const FEEDBACK_URL = '/api/v1/feedbacks';

const feedbacksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFeedbacks: builder.query({
        query: () => ({
            url: `${FEEDBACK_URL}/`,
        }),
    }),
  }),
});

export default feedbacksApiSlice;