import { mainApi } from '../../App/mainApi.js'

//TagSystem=> for cache management as when using rtk query data is not re-fetched after updating something. it gets from cache memory
export const orderApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({

        //query- what format data, mutation wat format data?
        getOrders: builder.query({
            query: (data) => ({
                url: 'orders',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${data.token}`,
                },
            }),
            providesTags: ['Order'] //It obeys 'invalidatetags' of the hook where data is expired. the hook provides task to re-fetch the data as it was expired.
        }),

        createOrder: builder.mutation({
            query: (data) => ({ //data=>addProduct object
                url: 'orders',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${data.token}`,
                },
                body: data.body
            }),
            invalidatesTags: ['Order'] //It expires the existng chache memory when the hook is called and action is performed . It is done to prepare for auto-refetch
        }),


    })
})

export const { useGetOrdersQuery, useCreateOrderMutation } = orderApi;