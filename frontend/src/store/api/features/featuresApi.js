import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const featuresApi = createApi({
    reducerPath: 'featuresApi',
    tagTypes: ['Features'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/api/v1/features/',
        prepareHeaders: (headers) => {
            return headers;
          },
    }),
    endpoints: (builder) => ({
        getFeatures: builder.query({
            query: (page) => {
                return {
                    url: `/?page=${page ? page : 1}`,
                }
            },
            providesTags: ['Features'],
        }),
    })
});

export const { 
    useLazyGetFeaturesQuery, 
} = featuresApi;