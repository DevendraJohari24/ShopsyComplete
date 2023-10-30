import { apiSlice } from './apiSlice';
const BLOG_URL = '/api/v1/blogs';

const blogsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
        query: () => ({
            url: `${BLOG_URL}/`,
        }),
    }),
  }),
});

export default blogsApiSlice;