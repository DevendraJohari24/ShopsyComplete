import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const portfoliosApi = createApi({
    reducerPath: 'portfoliosApi',
    tagTypes: ['Portfolio'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/api/v1/portfolios/',
        prepareHeaders: (headers) => {
            return headers;
          },
    }),
    endpoints: (builder) => ({
        getPortfolios: builder.query({
            query: (page) => {
                return {
                    url: `/?page=${page ? page : 1}`,
                }
            },
            providesTags: ['Portfolio'],
        }),
    })
});

export const { 
    useLazyGetPortfoliosQuery, 
} = portfoliosApi;