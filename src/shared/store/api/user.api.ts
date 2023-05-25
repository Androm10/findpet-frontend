import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '@shared/constants/api';
import { UserEntity } from 'core/entities/user.entity';
import customBaseQuery from './base-query';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: customBaseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUser: builder.query<UserEntity, number>({
      query: (id) => `user/${id}`,
      providesTags: ['User'],
    }),
    getUsers: builder.query<UserEntity[], undefined>({
      query: () => `user/`,
      providesTags: ['User'],
    }),
    createUser: builder.mutation<UserEntity, CreateUser>({
      query: (data) => ({
        url: `user/`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation<UserEntity, UpdateUser>({
      query: ({ id, ...data }) => ({
        url: `user/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation<UserEntity, number>({
      query: (id) => ({
        url: `user/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useDeleteUserMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
} = userApi;

type CreateUser = {
  username: string;
  login: string;
  password: string;
};

type UpdateUser = {
  username?: string;
  login?: string;
  id: string;
};
