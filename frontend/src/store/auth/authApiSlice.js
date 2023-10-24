import { authApi } from "../api/auth/authApi";

export const authApiSlice = authApi.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: (userData) => ({
                url: '/login',
                method: 'POST',
                body: userData
            })
        }),
        register: builder.mutation({
            query: (userData) => ({
                url: '/register',
                method: 'POST',
                body: userData
            }),
        }),
        logout: builder.query({
            query: () => ({
                url: '/logout'
            })
        })
    })
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useLazyLogoutQuery
} = authApiSlice;