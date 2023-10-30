import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const countdownsApi = createApi({
    reducerPath: 'countdownsApi',
    tagTypes: ['CountDown'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/api/v1/countdowns/',
        prepareHeaders: (headers) => {
            return headers;
          },
    }),
    endpoints: (builder) => ({
        getCountDowns: builder.query({
            query: (page) => {
                return {
                    url: `/?page=${page ? page : 1}`,
                }
            },
            providesTags: ['CountDown'],
        }),
    })
});

export const { 
    useLazyGetCountDownsQuery, 
} = countdownsApi;