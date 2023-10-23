import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const teamsApi = createApi({
    reducerPath: 'teamsApi',
    tagTypes: ['Team'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/api/v1/teams/',
        prepareHeaders: (headers) => {
            return headers;
          },
    }),
    endpoints: (builder) => ({
        getTeams: builder.query({
            query: (page) => {
                return {
                    url: `/?page=${page ? page : 1}`,
                }
            },
            providesTags: ['Team'],
        }),
    })
});

export const { 
    useLazyGetTeamsQuery, 
} = teamsApi;