import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Users } from './../components/users/users';

export const UsersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://mockend.com/org/repo'
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
    addUser: builder.mutation<{}, Users>({
      query: (body) => ({
        url: `/users`,
        method: 'POST',
        body,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authentication': 'Bearer 7445f34de3e5b0c9a2419f4aa29b8775411a7fd70ece1366d4abb79a9f15550d'
        }
      }),
      invalidatesTags: ['Users']
    }),
    updateUser: builder.mutation({
      query: ({id, ...body}) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 7445f34de3e5b0c9a2419f4aa29b8775411a7fd70ece1366d4abb79a9f15550d'
        }
      }),
      invalidatesTags: ['Users']
    })
  })
});

export const { useGetUsersQuery, useUpdateUserMutation, useAddUserMutation, useGetUserQuery } = UsersApi;