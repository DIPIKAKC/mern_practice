import { mainApi } from "../../App/mainApi";

const userApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({


    getUser: builder.query({
      query: (data) => ({
        url: `/users`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${data.token}`
        }
      }),
      providesTags: ['User']
    }),

    updateUser: builder.mutation({
      query: (data) => ({
        url: `/users`,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${data.token}`
        },
        body: data.body
      }),
      invalidatesTags: ['User']
    }),


  })
});

export const { useGetUserQuery, useUpdateUserMutation } = userApi;