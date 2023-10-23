import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
    reducerPath: 'productsApi',
    tagTypes: ['Product'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/api/v1/products/',
        prepareHeaders: (headers) => {
            return headers;
          },
    }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (page) => {
                return {
                    url: `/?page=${page}`,
                }
            },
            providesTags: ['Product'],
        }),
        getProductById: builder.query({
            query: (id) => {
                return {
                    url: `/${id}`
                }
            },
            providesTags: ['Product']
        })
    })
});

export const { 
    useLazyGetProductsQuery, 
    useLazyGetProductByIdQuery
} = productsApi;