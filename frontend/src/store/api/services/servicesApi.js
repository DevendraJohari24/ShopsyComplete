import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const servicesApi = createApi({
    reducerPath: 'servicesApi',
    tagTypes: ['Service'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/api/v1/services/',
        prepareHeaders: (headers) => {
            return headers;
          },
    }),
    endpoints: (builder) => ({
        getServices: builder.query({
            query: (page) => {
                return {
                    url: `/?page=${page ? page : 1}`,
                }
            },
            providesTags: ['Service'],
        }),
    })
});

export const { 
    useLazyGetServicesQuery, 
} = servicesApi;