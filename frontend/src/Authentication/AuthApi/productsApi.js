import { mainApi } from '../../App/mainApi.js'

//TagSystem=> for cache management as when using rtk query data is not re-fetched after updating something. it gets from cache memory
export const productsApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({

        //query- what format data, mutation wat format data?
        getProducts: builder.query({
            query: (query) => ({
                url: 'products',
                method: 'GET',
                params:query //for search
            }),
            providesTags: ['Product'] //It obeys 'invalidatetags' of the hook where data is expired. the hook provides task to re-fetch the data as it was expired.
        }),
        
        getSingleProduct: builder.query({
            query: (id) => ({
                url: `products/${id}`,
                method: 'GET',
            }),
            providesTags: ['Product'] //It obeys 'invalidatetags' of the hook where data is expired. the hook provides task to re-fetch the data as it was expired.
        }),

        createProduct: builder.mutation({
            query: (data) => ({ //data=>addProduct object
                url: 'products',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${data.token}`,

                },
                body: data.body
            }),
            invalidatesTags: ['Product'] //It expires the existng chache memory when the hook is called and action is performed . It is done to prepare for auto-refetch
        }),

        removeProduct: builder.mutation({
            query: (data) => ({
                url: `/products/${data.id}`,
                method: 'DELETE',
                headers: {
                    Authorization: data.token,
                },
            }),
            invalidatesTags: ['Product']
        }),
        
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `/products/${data.id}`,
                method: 'PATCH',
                headers: {
                    Authorization: data.token,
                },
                body:data.body,
            }),
            invalidatesTags: ['Product']
        }),

    })
})

export const { useGetProductsQuery, useCreateProductMutation, useRemoveProductMutation, useGetSingleProductQuery, useUpdateProductMutation } = productsApi;