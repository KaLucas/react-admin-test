import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Posts } from './../components/users/users';

export const UsersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://mockend.com/KaLucas/react-admin-test'
  }),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    getUsers: builder.query<Posts[], void>({
      query: () => '/posts',
      providesTags: ['Posts'],
    }),
    getUser: builder.query<Posts, string>({
      query: (id) => `/posts/${id}`,
      providesTags: ['Posts'],
    }),
    addUser: builder.mutation<{}, Posts>({
      query: (body) => ({
        url: `/posts`,
        method: 'POST',
        body
      }),
      invalidatesTags: ['Posts']
    }),
    updateUser: builder.mutation({
      query: ({id, ...body}) => ({
        url: `/posts/${id}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['Posts']
    })
  })
});

export const { useGetUsersQuery, useUpdateUserMutation, useAddUserMutation, useGetUserQuery } = UsersApi;