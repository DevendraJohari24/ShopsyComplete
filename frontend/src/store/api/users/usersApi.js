import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
    reducerPath: 'usersApi',
    credentials: "include",
    tagTypes: ['User'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/api/v1/users/',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            console.log(headers);
            console.log(getState);
            if(token){
                headers.set("authorization", `Bearer ${token}`)
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getCurrentUser: builder.query({
            query: () => {
                return {
                    url: "/me/"
                }
            },
            providesTags: ['User'],
        }),
    })
});

export const {useLazyGetCurrentUserQuery} = usersApi;

