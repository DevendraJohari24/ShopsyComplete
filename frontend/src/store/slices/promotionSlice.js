import { apiSlice } from './apiSlice';
const PROMOTION_URL = '/api/v1/promotions';

export const promotionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPromotions: builder.query({
        query: () => ({
            url: `${PROMOTION_URL}/`,
        }),
    }),
  }),
});

export const {
  useLazyGetPromotionsQuery
} = promotionsApiSlice;