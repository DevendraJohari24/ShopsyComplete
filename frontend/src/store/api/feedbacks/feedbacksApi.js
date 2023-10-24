import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const feedbacksApi = createApi({
    reducerPath: 'feedbacksApi',
    tagTypes: ['Feedback'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/api/v1/feedbacks/',
        prepareHeaders: (headers) => {
            return headers;
          },
    }),
    endpoints: (builder) => ({
        getFeedbacks: builder.query({
            query: (page) => {
                return {
                    url: `/?page=${page ? page : 1}`,
                }
            },
            providesTags: ['Feedback'],
        }),
    })
});

export const { 
    useLazyGetFeedbacksQuery, 
} = feedbacksApi;