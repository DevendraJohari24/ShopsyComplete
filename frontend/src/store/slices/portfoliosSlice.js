import { apiSlice } from './apiSlice';
const PORTFOLIO_URL = '/api/v1/portfolios';

export const portfoliosApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPortfolios: builder.query({
        query: () => ({
            url: `${PORTFOLIO_URL}/`,
        }),
    }),
  }),
});

export const {
  useLazyGetPortfoliosQuery
} = portfoliosApiSlice;