import { apiSlice } from './apiSlice';
const PRODUCT_URL = '/api/v1/products';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
        query: () => ({
            url: `${PRODUCT_URL}/`,
        }),
    }),
  }),
});

export const {
  useLazyGetProductsQuery
} = productsApiSlice;