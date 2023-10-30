import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const questionsApi = createApi({
    reducerPath: 'questionsApi',
    tagTypes: ['Question'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/api/v1/questions/',
        prepareHeaders: (headers) => {
            return headers;
          },
    }),
    endpoints: (builder) => ({
        getQuestions: builder.query({
            query: (page) => {
                return {
                    url: `/?page=${page ? page : 1}`,
                }
            },
            providesTags: ['Question'],
        }),
    })
});

export const { 
    useLazyGetQuestionsQuery, 
} = questionsApi;