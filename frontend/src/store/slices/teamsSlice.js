import { apiSlice } from './apiSlice';
const TEAM_URL = '/api/v1/teams';

export const teamsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeams: builder.query({
        query: () => ({
            url: `${TEAM_URL}/`,
        }),
    }),
  }),
});

export const {
  useLazyGetTeamsQuery
} = teamsApiSlice;