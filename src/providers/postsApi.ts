import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Posts } from '../components/posts/posts';

export const PostsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://mockend.com/KaLucas/react-admin-test'
  }),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    getPosts: builder.query<Posts[], void>({
      query: () => '/posts',
      providesTags: ['Posts'],
    }),
    getPost: builder.query<Posts, number>({
      query: (id) => `/posts/${id}`,
      providesTags: ['Posts'],
    }),
    addPost: builder.mutation<{}, Posts>({
      query: (body) => ({
        url: `/posts`,
        method: 'POST',
        body
      }),
      invalidatesTags: ['Posts']
    }),
    updatePost: builder.mutation({
      query: ({id, ...body}) => ({
        url: `/posts/${id}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['Posts']
    })
  })
});

export const { useGetPostsQuery, useUpdatePostMutation, useAddPostMutation, useGetPostQuery } = PostsApi;