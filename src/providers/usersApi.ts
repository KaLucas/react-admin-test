import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const UsersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://gorest.co.in/public/v2/users'
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
      providesTags: ['Users']
    }),
    editUsers: builder.mutation({
      query: ({id, ...body}) => ({
        url: `/users/${id}`,
        method: 'PUT',
        ...body
      }),
      invalidatesTags: ['Users']
    })
  })
});

export const { useGetUsersQuery, useEditUsersMutation } = UsersApi;