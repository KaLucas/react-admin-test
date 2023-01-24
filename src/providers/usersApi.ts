import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Users } from './../components/users/users';

export const UsersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://gorest.co.in/public/v2'
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUsers: builder.query<Users[], void>({
      query: () => '/users',
      providesTags: ['Users'],
    }),
    getUser: builder.query<Users, string>({
      query: (id) => `/users/${id}`,
      providesTags: ['Users'],
    }),
    editUsers: builder.mutation({
      query: ({id, ...body}) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['Users']
    })
  })
});

export const { useGetUsersQuery, useEditUsersMutation, useGetUserQuery } = UsersApi;