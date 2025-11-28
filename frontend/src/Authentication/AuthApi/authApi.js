import { createApi } from '@reduxjs/toolkit/query/react'
import { mainApi } from '../../App/mainApi.js'

export const authApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({

        userLogin: builder.mutation({
            query: (body) => ({
                url: 'users/login',
                method: 'POST',
                body
            })
        }),
        
        userRegister: builder.mutation({
            query: (body) => ({
                url: 'users/register',
                method: 'POST',
                body
            })
        }),


    })
})

export const { useUserLoginMutation, useUserRegisterMutation } = authApi;