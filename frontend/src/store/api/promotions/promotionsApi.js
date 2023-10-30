import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const promotionsApi = createApi({
    reducerPath: 'promotionsApi',
    tagTypes: ['Promotion'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/api/v1/promotions/',
        prepareHeaders: (headers) => {
            return headers;
          },
    }),
    endpoints: (builder) => ({
        getPromotions: builder.query({
            query: (page) => {
                return {
                    url: `/?page=${page ? page : 1}`,
                }
            },
            providesTags: ['Promotion'],
        }),
    })
});

export const { 
    useLazyGetPromotionsQuery, 
} = promotionsApi;