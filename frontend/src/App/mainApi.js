import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { createApi } from '@reduxjs/toolkit/query/react'

export const base= 'http://localhost:5000';

export const mainApi= createApi({
    reducerPath: 'mainApi',
    baseQuery:fetchBaseQuery({baseUrl:`${base}/api`}),
    endpoints:()=>({})
})

//IP Address
//192.168.1.130