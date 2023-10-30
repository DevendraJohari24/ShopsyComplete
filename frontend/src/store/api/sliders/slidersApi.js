import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const slidersApi = createApi({
    reducerPath: 'slidersApi',
    tagTypes: ['Slider'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/api/v1/sliders/',
        prepareHeaders: (headers) => {
            return headers;
          },
    }),
    endpoints: (builder) => ({
        getSliders: builder.query({
            query: (page) => {
                return {
                    url: `/?page=${page ? page : 1}`,
                }
            },
            providesTags: ['Slider'],
        }),
    })
});

export const { 
    useLazyGetSlidersQuery, 
} = slidersApi;