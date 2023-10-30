import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogsApi = createApi({
    reducerPath: 'blogsApi',
    tagTypes: ['Blogs'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/api/v1/blogs/',
        prepareHeaders: (headers) => {
            return headers;
          },
    }),
    endpoints: (builder) => ({
        getBlogs: builder.query({
            query: (page) => {
                return {
                    url: `/?page=${page ? page : 1}`,
                }
            },
            providesTags: ['Blogs'],
        }),
    })
});

export const { 
    useLazyGetBlogsQuery, 
} = blogsApi;