import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const UsersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://gorest.co.in/public/v2'
  }),
  tagTypes: ['Users'],
  endpoints: (build) => ({
    getUsers: build.query({
      query: () => '/users',
      providesTags: ['Users']
    }),
    editUsers: build.mutation({
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